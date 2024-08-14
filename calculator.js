export default class Calculator 
{
    constructor()
    {
        this.result = 0;
    }

    add = (a, b) => this.result = a + b;

    sub = (a, b) => this.result = a - b;

    mul = (a, b) => this.result = a * b;
    
    div = (a, b) => this.result = a / b;
    
    reset = () => this.result = 0;

    getResult = () => this.result;
}

