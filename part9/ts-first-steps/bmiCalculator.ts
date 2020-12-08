export const calculateBmi = (height: number, weight: number) : string => {
    let bmi = weight / ((height/100) * (height/100))
    if(bmi < 15)return "Very severely underweight"
    else if(bmi >= 15 && bmi < 16) return "Severely underweight"
    else if(bmi >= 16 && bmi < 18.5) return "Underweight"
    else if(bmi >= 18.5 && bmi < 25) return "Normal (healthy weight)"
    else if(bmi >= 25 && bmi < 30) return "Overweight"
    else if(bmi >= 30 && bmi < 35) return "Obese Class I (Moderately obese)"
    else if(bmi >= 35 && bmi < 40) return "Obese Class II (Severely obese)"
    else return "Obese Class III (Very severely obese)"
}

interface ParsedBmiArgs {
    height: number;
    weight: number;
  }
  
const parseArguments = (args: Array<string>): ParsedBmiArgs => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3]),
      };
    } else {
      throw new Error("Provided values were not numbers!");
    }
  };
  
const isCalledDirectly = require.main === module;
  
  if (isCalledDirectly) {
    try {
      const { height, weight } = parseArguments(process.argv);
      console.log(calculateBmi(height, weight));
    } catch (e) {
      console.log("An error has occured: ", e.message);
      console.log("USAGE: npm run calculateBmi height(cm) weight(kg)");
    }
  }