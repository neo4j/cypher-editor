import sveltePreprocess from "svelte-preprocess";

export default {
  compilerOptions: {
    enableSourcemap: true
  },
  preprocess: sveltePreprocess({
    sourceMap: true
  })
};

// export default {
//   // Consult https://github.com/sveltejs/svelte-preprocess
//   // for more information about preprocessors
//   preprocess: sveltePreprocess()
// };
