const dev = {fileName: "Dev", variables: "FOO=bar\nHello=world\nLeet=code\nCode=pen"};
const qa = {fileName: "Qa", variables: "Hello=world\nLeet=code\nCode=qa_pen"};
const prod = {fileName: 'Prod', variables: "FOO=bar\nLeet=prod_code\nCode=pen\nEnv=prod"};
const staging = {fileName: 'Stagging', variables: "Code=pen\nEnv=prod"};

class EnvironmentValidator{
  envs;

  constructor(environments) {
    this.envs = this.#parseEnvironments(environments)
  }

  #parseEnvironments(environments) {
    return environments.map(env => ({
      ...env,
      variables: this.#getVarsObject(env.variables)
    }))
  }

  #getVarsObject(variablesAsString) {
    const stringVars = variablesAsString.split('\n')

    return stringVars.reduce((vars, stringVar) => {
      const [key, val] = stringVar.split('=');
      vars[key] = val;
      return vars;
    }, {})
  }

  #getVariablesUnion(envs) {
    const arr = []

    for (const env of envs) {
      const envVariables = Object.keys(env.variables);
      arr.push(...envVariables)
    }

    return Array.from(new Set(arr))
  }

  checkMissing() {
    const map = {};
    const variablesUnion = this.#getVariablesUnion(this.envs)

    console.log(variablesUnion)
    for (const {fileName, variables} of this.envs) {
      let missingVars = [];

      for (const variable of variablesUnion) {
        if (!variables[variable]) {
          missingVars.push(variable)
        }
      }

      map[fileName] = missingVars
    }

    return map;
  }

  checkMissing2() {
    const map = {};
    const variablesUnion = this.#getVariablesUnion(this.envs)

    console.log(variablesUnion)
    for (const {fileName, variables} of this.envs) {
      const envVariables = new Set(Object.keys(variables))

      const missingVars = variablesUnion.filter( env => !envVariables.has(env))

      map[fileName] = missingVars
    }

    return map;
  }

}

const validateEnvironmentFiles = (environments) => {
  const validator = new EnvironmentValidator(environments)
  const missing = validator.checkMissing2()

  console.log('missing: ', missing);

  console.log(validator.envs)
};


validateEnvironmentFiles([dev, qa, prod, staging]);


// ============== 2 =================
// const getVarsObject = (variablesAsString) => {
//   const stringVars = variablesAsString.split('\n')
//
//   return stringVars.reduce((vars, stringVar) => {
//     const [key, val] = stringVar.split('=');
//     vars[key] = val;
//     return vars;
//   }, {})
// }
//
// const getOtherVariables = (envs) => {
//   const allVars = envs.reduce((acc, {variables}) => {
//     const variablesKeys = Object.keys(variables);
//
//     return [...acc, ...variablesKeys]
//   }, [])
//
//   const singleVars = new Set(allVars)
//   return Array.from(singleVars);
// }
//
// const getDiff = (arr1, arr2) => {
//   return arr2.filter( x => !arr1.includes(x))
// }
//
// const getMissingEnvVars = (envs) => {
//   const missingMap = new Map();
//
//   envs.forEach( env => {
//     const currentEnv = env.fileName;
//     const currentVars = Object.keys(env.variables);
//
//     const otherEnvs = envs.filter(env => env.fileName !== currentEnv);
//     const otherVars = getOtherVariables(otherEnvs)
//
//     const missingVariables = getDiff(currentVars, otherVars)
//     missingMap.set(currentEnv, missingVariables)
//   })
//
//   return missingMap;
// }
//
// const validateEnvironmentFiles = (environments) => {
//   const envs = environments.map(env => ({
//     ...env,
//     variables: getVarsObject(env.variables)
//   }))
//
//   const missingVars = getMissingEnvVars(envs)
//
//   console.log(missingVars)
// };
//
// validateEnvironmentFiles([dev, qa, prod, staging]);
//
// // Check for identical values across all envs
