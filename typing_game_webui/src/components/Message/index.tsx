const Message = ({message}) => {
    return (
      <div className="system-message">
        <p className="text-base leading-relaxed dark:text-white text-gray-500 bg-inherit">
          <span className="system-message-text">{message}</span>
        </p>
      </div>
    );
  };

  export default Message;