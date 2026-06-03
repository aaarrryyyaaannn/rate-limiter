exports.hideip = (ip) => {
  const parts = ip.split('.');
  if (parts.length !== 4) { return ip;}

  return `${parts[0]}.${parts[1]}.***.***`;
}