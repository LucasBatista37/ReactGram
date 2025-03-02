const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter no mínimo 3 caracteres")
      .isLength({ max: 70 })
      .withMessage("Pra que um título desse tamanho? kkkk"),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .exists()
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título precisa ser uma string")
      .isLength({ min: 3 })
      .withMessage("O título precisa ter no mínimo 3 caracteres")
      .isLength({ max: 70 })
      .withMessage("Pra que um título desse tamanho? kkkk"),
  ];
};

const commentValidation = () => {
  return [
    body("comment").isString().withMessage("O comentário é obrigatório")
  ];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
