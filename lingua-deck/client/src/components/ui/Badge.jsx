import PropTypes from "prop-types";

Level.propTypes = {
  level: PropTypes.string.isRequired,
};

Topic.propTypes = {
  topic: PropTypes.string.isRequired,
};

User.propTypes = {
  username: PropTypes.string.isRequired,
};

function Level({ level }) {
  if (!level) {
    return null;
  }
  let customStyle = "";
  if (level === "beginner") {
    customStyle = "bg-[#469265]";
  } else if (level === "intermediate") {
    customStyle = "bg-[#f7d354]";
  } else if (level === "advance") {
    customStyle = "bg-[#db3a36]";
  } else {
    customStyle = "bg-zinc-200";
  }
  return <p className={`text-white text-[10px] font-mono px-1 rounded flex items-center max-w-fit ${customStyle}`}>{level}</p>;
}

function Topic({ topic }) {
  if (!topic) {
    return null;
  }
  return <span className="text-[10px] font-mono px-1 rounded flex items-center max-w-fit bg-[#c7a5c9] text-white">{topic}</span>;
}

function User({ username }) {
  return <span className="text-[10px] font-mono px-2 py-1 rounded flex items-center max-w-fit bg-violet-800 text-violet-400">{username}</span>;
}

const Badge = {
  Level,
  Topic,
  User,
};

export { Badge };
