class FSM {
    constructor(config) {
        this.obj = config;
        this.current = this.obj.initial;
        this.actionQueue = ['normal'];
        this.actionCur = 0;
        this.statesArr = Object.getOwnPropertyNames(this.obj.states);
    }

    getState() {
        return this.current;
    }

    changeState(state) {
        if (this.statesArr.includes(state)) {
            this.current = state;
            this.actionQueue.push(this.current);
            this.actionCur = this.actionQueue.length - 1;
        }
        else {
            throw new Error();
        }
    }

    trigger(event) {
        if (Object.getOwnPropertyNames(this.obj.states[this.current]['transitions']).includes(event)) {
            this.current = this.obj.states[this.current]['transitions'][event];
            if(!this.actionQueue.includes(this.current)) {
                this.actionQueue.push(this.current);
            }
            this.actionCur = this.actionQueue.length - 1;
        }
        else {
            throw new Error();
        }

    }

    reset() {
        this.current = this.obj.initial;
    }

    getStates(event) {
        let tempStates = [];
        let check = false;
        if (arguments.length === 0) {
            return this.statesArr;
        }
        else {
            for (let i = 0; i < this.statesArr.length; i++) {
                if (Object.getOwnPropertyNames(this.obj.states[this.statesArr[i]]['transitions']).includes(event)) {
                    tempStates.push(this.statesArr[i]);
                    check = true;
                }
            }
            if (check === false) {
                return [];
            }
            else {
                return tempStates;
            }
        }
    }

    undo() {
        if (this.actionQueue.length === 1 || this.actionCur < 1) {
            return false;
        }
        else {
            this.current = this.actionQueue[--this.actionCur];
            return true;
        }
    }

    redo() {
        if (this.actionQueue.length === 1 || this.actionCur >= this.actionQueue.length - 1) {
            return false;
        }
        else {
            this.current = this.actionQueue[++this.actionCur];
            return true;
        }
    }

    clearHistory() {
        this.actionQueue = ['normal'];
    }
}

module.exports = FSM;