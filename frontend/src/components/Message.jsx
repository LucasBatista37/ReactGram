import './Message.css'

const Message = ({ msg, type }) => { // Corrigido para desestruturar as propriedades corretamente
  return (
    <div className={`message ${type}`}>
        <p>{msg}</p>
    </div>
  )
}

export default Message
