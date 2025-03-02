const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

//insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const user = req.user;

  // Create a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  // if photo created sucessfully, return data
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um problema, por favor tente novamente mais tarde"],
    });
    return;
  }

  res.status(201).json(newPhoto);
};

const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

  // Check if photo exists
  try {
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }

    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada"] });
    return;
  }
};

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

// Get user photos
const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

  // Check if photo exists

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }

  res.status(200).json(photo);
};

// Update a photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  // Check if Photo exists
  if (!photo) {
    res.status(404).json({ errors: "Foto não encontrada" });
    return;
  }

  if (!photo.userId.equals(reqUser._id)) {
    res.status(422).json({
      errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();

  res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
};

const likePhoto = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // ID do usuário que está curtindo a foto

  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ errors: ["Foto não encontrada!"] });
    }

    // Verifica se o usuário já curtiu a foto
    if (photo.likes.includes(userId)) {
      return res.status(422).json({ errors: ["Você já curtiu esta foto."] });
    }

    // Incrementa o número de curtidas e salva a foto
    photo.likes.push(userId);
    await photo.save();

    res.status(200).json({ photoId: id, userId, message: "A foto foi curtida!" });
  } catch (error) {
    console.error("Erro ao curtir a foto:", error);
    res.status(500).json({ errors: ["Erro interno do servidor."] });
  }
};

const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const userId = req.user._id; // ID do usuário que está comentando

  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ errors: ["Foto não encontrada!"] });
    }

    // Adiciona o comentário ao array de comentários da foto
    const user = await User.findById(userId);
    const userComment = {
      comment,
      userName: user.name,
      userImage: user.profileImage,
      userId,
    };
    photo.comments.push(userComment);
    await photo.save();

    res.status(200).json({ comment: userComment, message: "Comentário adicionado com sucesso!" });
  } catch (error) {
    console.error("Erro ao adicionar comentário à foto:", error);
    res.status(500).json({ errors: ["Erro interno do servidor."] });
  }
};

// Search a photo by title
const searchPhotos = async (req, res) => {
  const { q } = req.query;

  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
