import { addMessageListener } from "./util/messageListnerUtil";
import { runListener } from "./listners/runListner";
import { compileListener } from "./listners/compileListner";
import { loadAssemblies } from "./util/dotnetUtil";
import { addCompiler } from "./compilers/compile";
import Language from "../shared_model/language";
import compileCSharp from "./compilers/csharpCompiler";

addMessageListener("run", runListener);
addMessageListener("compile", compileListener);

addCompiler(Language.CSharp, compileCSharp);

loadAssemblies();
