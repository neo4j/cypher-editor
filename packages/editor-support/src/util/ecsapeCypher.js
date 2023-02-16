export const ecsapeCypher = (str) => {
  const prefix = str.startsWith(":") ? ":" : "";
  let content = str;
  if (prefix.length > 0) {
    content = str.substring(1);
  }
  return /^[A-Za-z][A-Za-z0-9_]*$/.test(content)
    ? prefix + content
    : `${prefix}\`${content.replace(/`/g, "``")}\``;
};
