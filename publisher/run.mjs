import {generateOne} from './generate.mjs';
import {publishQueue} from './publish.mjs';
import {init,log,lock} from './runtime.mjs';
await init();
try{await lock('schedule',async()=>{let generationFailed=false;const dryRun=process.argv.includes('--dry-run');if(process.argv.includes('--generate')&&!dryRun){try{await generateOne();}catch(e){generationFailed=true;await log(`Draft generation failed: ${e.message}`);}}await publishQueue({dryRun});if(generationFailed)process.exitCode=1;});}catch(e){await log(e.message);process.exitCode=1;}
