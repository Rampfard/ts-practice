import { ProjectItem } from './project-item';
import { Component } from './base-component';
import { DragTarget } from './../models/drag-drop';
import { Project } from './../models/project';
import { AutoBind } from '../decorators/autobind';
import { projectState } from './../state/project-state';
import { ProjectStatus } from './../models/project';

export class ProjectList
	extends Component<HTMLDivElement, HTMLElement>
	implements DragTarget
{
	assignedProject: Project[];

	constructor(private type: 'active' | 'finished') {
		super('project-list', 'app', false, `${type}-projects`);
		this.assignedProject = [];
		this.renderContent();
		this.configure();
	}

	@AutoBind
	dragLeaveHandler(e: DragEvent) {
		if (e.target !== this.element) {
			return;
		}
		const listEl = this.element.querySelector('ul')!;
		listEl.classList.remove('droppable');
	}

	@AutoBind
	dragOverHandler(e: DragEvent) {
		if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
			e.preventDefault();
			const listEl = this.element.querySelector('ul')!;
			listEl.classList.add('droppable');
		}
	}

	@AutoBind
	dropHandler(e: DragEvent) {
		const projectId = e.dataTransfer!.getData('text/plain');
		projectState.moveProject(
			projectId,
			this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
		);
	}

	renderContent() {
		const listId = `${this.type}-projects-list`;

		this.element.querySelector('ul')!.id = listId;
		this.element.querySelector('h2')!.textContent =
			this.type.toUpperCase() + ' PROJECTS';
	}

	configure() {
		this.element.addEventListener('dragover', this.dragOverHandler);
		this.element.addEventListener('drop', this.dropHandler);
		this.element.addEventListener('dragleave', this.dragLeaveHandler, true);

		projectState.addListener((projects: Project[]) => {
			const relevantProjects = projects.filter((prj) => {
				if (this.type === 'active') {
					return prj.status === ProjectStatus.Active;
				} else {
					return prj.status === ProjectStatus.Finished;
				}
			});
			this.assignedProject = relevantProjects;
			this.renderProjects();
		});
	}

	private renderProjects() {
		const listEl = document.getElementById(
			`${this.type}-projects-list`
		)! as HTMLUListElement;

		listEl.innerHTML = '';

		for (const prjItem of this.assignedProject) {
			new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
		}
	}
}
