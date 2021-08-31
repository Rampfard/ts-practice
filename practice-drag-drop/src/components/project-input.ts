import { Component } from './base-component';
import { Validatable } from '../utils/validation';
import { validate } from '../utils/validation';
import { AutoBind } from '../decorators/autobind';
import { projectState } from './../state/project-state';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInputEl: HTMLInputElement;
	descriptionInputEl: HTMLInputElement;
	peopleInputEl: HTMLInputElement;

	constructor() {
		super('project-input', 'app', true, 'user-input');
		this.titleInputEl = this.element.querySelector(
			'#title'
		) as HTMLInputElement;
		this.descriptionInputEl = this.element.querySelector(
			'#description'
		) as HTMLInputElement;
		this.peopleInputEl = this.element.querySelector(
			'#people'
		) as HTMLInputElement;

		this.configure();
	}

	configure() {
		this.element.addEventListener('submit', this.submitHandler);
	}

	renderContent() {}

	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputEl.value;
		const enteredDescription = this.descriptionInputEl.value;
		const enteredPeople = this.peopleInputEl.value;

		const titleValidatable: Validatable = {
			value: enteredTitle,
			required: true,
		};

		const descriptionValidatable: Validatable = {
			value: enteredDescription,
			required: true,
			minLenght: 5,
		};

		const peopleValidatable: Validatable = {
			value: +enteredPeople,
			required: true,
			min: 1,
			max: 5,
		};

		if (
			!validate(titleValidatable) ||
			!validate(descriptionValidatable) ||
			!validate(peopleValidatable)
		) {
			console.log('Invalid input');
			return;
		} else {
			return [enteredTitle, enteredDescription, +enteredPeople];
		}
	}

	@AutoBind
	private submitHandler(e: Event) {
		e.preventDefault();

		const userInput = this.gatherUserInput();

		if (Array.isArray(userInput)) {
			const [title, description, people] = userInput;

			projectState.addProject(title, description, people);

			this.clearInputs();
		}
	}

	private clearInputs() {
		this.titleInputEl.value = '';
		this.descriptionInputEl.value = '';
		this.peopleInputEl.value = '';
	}
}
