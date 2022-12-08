import "antlr4/src/antlr4/utils/stringHashCode.js";
import "antlr4/src/antlr4/polyfills/codepointat.js";
import "antlr4/src/antlr4/polyfills/fromcodepoint.js";
import { default as atn } from "antlr4/src/antlr4/atn/index.js";
import { default as dfa } from "antlr4/src/antlr4/dfa/index.js";
import { default as tree } from "antlr4/src/antlr4/tree/index.js";
import { default as error } from "antlr4/src/antlr4/error/index.js";
import Token from "antlr4/src/antlr4/Token.js";
import CommonToken from "antlr4/src/antlr4/CommonToken.js";
// import { default as CharStreams } from 'antlr4/src/antlr4/CharStreams.js';
import InputStream from "antlr4/src/antlr4/InputStream.js";
// import FileStream from 'antlr4/src/antlr4/FileStream.js';
import CommonTokenStream from "antlr4/src/antlr4/CommonTokenStream.js";
import Lexer from "antlr4/src/antlr4/Lexer.js";
import Parser from "antlr4/src/antlr4/Parser.js";
import PredictionContextCache from "antlr4/src/antlr4/atn/PredictionContextCache.js";
import ParserRuleContext from "antlr4/src/antlr4/context/ParserRuleContext.js";
import Interval from "antlr4/src/antlr4/misc/Interval.js";
import IntervalSet from "antlr4/src/antlr4/misc/IntervalSet.js";
import LL1Analyzer from "antlr4/src/antlr4/atn/LL1Analyzer.js";
import { default as Utils } from "antlr4/src/antlr4/utils/index.js";

const antlr4 = {
  atn,
  dfa,
  tree,
  error,
  Token,
  CommonToken,
  /* CharStreams, */
  InputStream,
  /* FileStream, */
  CommonTokenStream,
  Lexer,
  Parser,
  PredictionContextCache,
  ParserRuleContext,
  Interval,
  IntervalSet,
  LL1Analyzer,
  Utils
};

export default antlr4;
