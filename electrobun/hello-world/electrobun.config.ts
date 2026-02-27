import type { ElectrobunConfig } from "electrobun";

export default {
	app: {
		name: "hello-world",
		identifier: "helloworld.electrobun.dev",
		version: "0.0.1",
	},
	build: {
		    bun: {
      entrypoint: "src/bun/index.ts",
    },
		views: {
			"main-ui": {
				entrypoint: "src/main-ui/index.ts",
			},
		},
		copy: {
			"src/main-ui/index.html": "views/main-ui/index.html",
			"src/main-ui/index.css": "views/main-ui/index.css",
		},
		mac: {
			bundleCEF: false,
		},
		linux: {
			bundleCEF: false,
		},
		win: {
			bundleCEF: false,
		},
	},
} satisfies ElectrobunConfig;
