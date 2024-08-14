import Calc from "./calculator.js"

export default class CalculatorUI
{
    constructor()
    {
        this.Calculator = new Calc();

        this.previusValue = "";
        this.currentValue = "";

        this.operationChar = "";
        this.operation = "";

        this.hasResult = false;  
                
        const self = this;

        document.addEventListener(`keydown`, function(event)
        {
            const key = event.key;
     
            if (key >= `0` && key <= `9`)
            {
                self.numericInput(key);
            }
            else
            {
                switch (key) {
                    case `Enter`:
                    case `=`:
                        self.equal()
                        break;

                    case `Backspace`:
                        self.delete();
                        break;

                    case `Escape`:
                        self.clear()
                        break;

                    case `-`:
                        self.operationBtnUpdate(`SUB`,` -`)
                        break;

                    case `/`:
                        self.operationBtnUpdate(`DIV`,` /`)
                        break;

                    case `*`:
                        self.operationBtnUpdate(`MUL`,` *`)
                        break;

                    case `+`:
                        self.operationBtnUpdate(`ADD`,` +`)
                        break;

                    case `.`:
                        self.decimal();
                        break;
                
                    default:
                        event.preventDefault();
                        break;
                }
            }
        });

    }


    Init()
    {        
        this.displayCurrent = document.getElementById("current");

        this.displayPrevius = document.getElementById("previus");

        const numericBtns = document.querySelectorAll(`.btn_num`);

        const btn_add = document.getElementById("btn_add");
        const btn_sub = document.getElementById("btn_sub");
        const btn_mul = document.getElementById("btn_mul");
        const btn_div = document.getElementById("btn_div");
        const btn_del = document.getElementById("btn_del");
        const btn_clear = document.getElementById("btn_clear");
        const btn_equal = document.getElementById("btn_equal");
        const btn_decimal = document.getElementById("btn_decimal");

        
        btn_add.addEventListener("click",()=> this.operationBtnUpdate(`ADD`,` +`) );

        btn_sub.addEventListener("click",()=> this.operationBtnUpdate(`SUB`,` -`)); 

        btn_mul.addEventListener("click",()=> this.operationBtnUpdate(`MUL`,` *`));

        btn_div.addEventListener("click",()=> this.operationBtnUpdate(`DIV`,` /`));

        btn_del.addEventListener("click", () => this.delete());

        btn_clear.addEventListener("click",()=> this.clear());

        btn_equal.addEventListener("click",()=> this.equal());

        btn_decimal.addEventListener("click", ()=>  this.decimal());

        numericBtns.forEach(element =>
        {
            element.addEventListener("click", ()=> this.numericInput(element.textContent))
        });
    }

    operationBtnUpdate(operation, operationChar)
{
    if (this.hasResult)
    {
        this.hasResult = false;
    }
    if (this.operation)
    {
        if(this.currentValue)
        {
            this.previusValue = this.calculate();

            if (this.previusValue === `Error`)
            {
                this.printError();
            }
            else 
            {
                btn_decimal.disabled = false;
                this.currentValue = "";
                this.operation = operation;
                this.operationChar = operationChar;

                this.printDisplay();
            }
            
        }
        else
        {
            this.operation = operation;
            this.operationChar = operationChar;

            this.printDisplay();
        }

    }
    else
    {
        if(this.currentValue)
        {
            btn_decimal.disabled = false;
            this.previusValue = this.currentValue;
            this.currentValue = "";
            this.operation = operation;
            this.operationChar = operationChar;
            this.printDisplay();
        }
        else this.printError();
    }
}

    printDisplay(current = this.currentValue, previus = this.previusValue + this.operationChar)
    {
        this.displayCurrent.textContent = current;
        this.displayPrevius.textContent = previus;
    }

    numericInput(value)
    {
        if (this.hasResult)
        {
            this.hasResult = false;

            if (!this.operation)
            {
                this.clear();
            }
        }

        this.currentValue += value;
        this.printDisplay();
    }

    calculate ()
    {
    
        let a = Number(this.previusValue);
        let b = Number(this.currentValue);

        if (b === 0 && this.operation === `DIV`)
            {
                return `Error`
            } 

        if(this.operation===`ADD`){this.Calculator.add(a,b);};

        if(this.operation===`SUB`){this.Calculator.sub(a,b)};

        if(this.operation===`MUL`){this.Calculator.mul(a,b)};

        if(this.operation===`DIV`){this.Calculator.div(a,b)};

        this.hasResult = true;

        return this.Calculator.getResult();
    }

    decimal()
    {
        if (this.hasResult)
        {
            this.hasResult = false;
            this.clear();
        }

        if (this.currentValue)
        {
            this.currentValue += `.`;
        }
        else this.currentValue = `0.`;

        btn_decimal.disabled = true;

        this.printDisplay();

    }

    equal ()
    {
        if (this.operation)
            {
                if (this.currentValue)
                {
                    this.currentValue = this.calculate();

                    if (this.currentValue == `Error`)
                    {
                        this.printError();
                    }
                    else 
                    {
                        this.previusValue = "";
                        this.operation = "";
                        this.operationChar = "";
                        this.printDisplay();
                    }
                }
                else 
                {
                    this.printError();
                }
            }       
    }

    delete()
    {
        if (!this.hasResult)
            {
                if (this.currentValue.endsWith(`.`))
                {
                    btn_decimal.disabled = false;
                }

                this.currentValue = this.currentValue.slice(0, -1);
                this.printDisplay();
            }

        
    }

    clear()
    {
        this.currentValue = "";
        this.previusValue = "";
        this.operation = "";
        this.operationChar = "";
        this.hasResult = false;
        btn_decimal.disabled = false;


        this.printDisplay();

        this.Calculator.reset();
    }

    printError ()
    {
        this.clear();
        this.printDisplay("Error");
    }
}