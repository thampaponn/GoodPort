const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// react-hook-form's web entry point is an .mjs file.
config.resolver.sourceExts.push("mjs");

module.exports = config;
