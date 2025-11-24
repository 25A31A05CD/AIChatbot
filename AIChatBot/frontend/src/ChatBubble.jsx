export default function ChatBubble({ sender, text }) {
  return (
    <div className={`bubble ${sender}`}>
      {text}
    </div>
  );
}
