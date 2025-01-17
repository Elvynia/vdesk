import { Project } from "ts-morph";

export function organize(project: Project, path: string) {
	const file = project.getSourceFile(path);
	if (file) {
		file.organizeImports();
	} else {
		console.error('[WARN] Missing file ' + path);
	}
}
