import { Tree } from "@nx/devkit";
import { Project } from "ts-morph";
import { dasherize } from "../../manipulation/dasherize";
import { organize } from "../../manipulation/organize";
import { OrganizeGeneratorSchema } from "./schema";

async function organizeGenerator(
	tree: Tree,
	options: OrganizeGeneratorSchema
) {
	const project = new Project({
		tsConfigFilePath: 'tsconfig.base.json'
	});
	const backlib = 'entity';
	const frontapp = 'vtally';
	const frontlib = 'angular';
	options.nameDash = dasherize(options.name);
	if (process.env.NX_DRY_RUN === 'false') {
		// Organize imports for new files.
		organize(project, `./libs/common/src/lib/${options.nameDash}/${options.nameDash}.type.ts`);
		organize(project, `./libs/common/src/index.ts`);
		organize(project, `./libs/${backlib}/src/lib/${options.nameDash}/${options.nameDash}.entity.ts`);
		organize(project, `./libs/${backlib}/src/lib/${options.nameDash}/${options.nameDash}.module.ts`);
		organize(project, `./libs/${backlib}/src/lib/${options.nameDash}/${options.nameDash}.resolver.ts`);
		organize(project, `./libs/${backlib}/src/lib/${options.nameDash}/${options.nameDash}.service.ts`);
		organize(project, `./libs/${backlib}/src/index.ts`);
		organize(project, `./libs/${frontlib}/src/lib/${options.nameDash}/form/form.component.ts`);
		organize(project, `./libs/${frontlib}/src/lib/${options.nameDash}/form-card/form-card.component.ts`);
		organize(project, `./libs/${frontlib}/src/lib/${options.nameDash}/item/item.component.ts`);
		organize(project, `./libs/${frontlib}/src/lib/${options.nameDash}/list/list.component.ts`);
		organize(project, `./libs/${frontlib}/src/lib/${options.nameDash}/${options.nameDash}.actions.ts`);
		organize(project, `./libs/${frontlib}/src/lib/${options.nameDash}/${options.nameDash}.config.ts`);
		organize(project, `./libs/${frontlib}/src/lib/${options.nameDash}/${options.nameDash}.effects.ts`);
		organize(project, `./libs/${frontlib}/src/lib/${options.nameDash}/${options.nameDash}.reducer.ts`);
		organize(project, `./libs/${frontlib}/src/lib/${options.nameDash}/${options.nameDash}.service.ts`);
		organize(project, `./libs/${frontlib}/src/index.ts`);
		organize(project, `./apps/${frontapp}/src/app/${options.nameDash}/view/view.component.ts`);
		await project.save();
	}
}

export default organizeGenerator;
