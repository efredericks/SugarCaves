/* This is a helper class, to make Promises you can easily pull the value from synchronously */

const InspectablePromise = (function() {
	var statusProp = Symbol("status");
	var progressProp = Symbol("progress");
	var valueProp = Symbol("value");
	var reasonProp = Symbol("reason");

	/**
	 * Inspectable Promise
	 */
	class InspectablePromise extends Promise {
		/**
		 * @param {(resolve: (value: any) => void, reject: (reason: any) => void, progress: (progress: any) => void) => void} executor
		 */
		constructor(executor) {
			var self;
			super((resolve, reject) => {
				executor(
					(value) => {
						if(self) {
							self[statusProp] = "resolved";
							self[valueProp] = value;
							resolve(value);
						} else {
							setTimeout(() => {
								self[statusProp] = "resolved";
								self[valueProp] = value;
								resolve(value);
							}, 0);
						}
					},
					(reason) => {
						if(self) {
							self[statusProp] = "rejected";
							self[reasonProp] = reason;
							reject(reason);
						} else {
							setTimeout(() => {
								self[statusProp] = "rejected";
								self[reasonProp] = reason;
								reject(reason);
							}, 0);
						}
					},
					(progress) => {
						if(self) {
							self[progressProp] = progress;
						} else {
							setTimeout(() => { self[progressProp] = progress; }, 0);
						}
					}
				);
			});
			self = this;
			this[statusProp] = "pending";
		}

		get status() { return this[statusProp]; }
		get pending() { return this[statusProp] === "pending"; }
		get resolved() { return this[statusProp] === "resolved"; }
		get rejected() { return this[statusProp] === "rejected"; }
		get value() { return this[valueProp]; }
		get reason() { return this[reasonProp]; }
		get progress() { return this[progressProp]; }
	}

	return InspectablePromise;
})();

