export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
	return <PropertyDescriptor>{
		configurable: true,
		get() {
			return descriptor.value.bind(this);
		},
	};
}
