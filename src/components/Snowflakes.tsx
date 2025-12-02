const Snowflakes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {Array.from({ length: 15 }).map((_, i) => (
        <span key={i} className="snowflake">
          ❄
        </span>
      ))}
    </div>
  );
};

export default Snowflakes;
