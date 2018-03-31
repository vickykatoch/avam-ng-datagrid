export interface Emp {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
}




export class EmployeeBuilder {
  static build(): Emp {
    return {
      id: 1,
      firstName: "David",
      lastName: "Shaun",
      gender: "M",
      age: 35,
    };
  }
  static save(emp: Emp) {
    console.log(emp);
  }
  static buildEmpData(num: number): Emp[] {
    const emps: Emp[] = [];
    for (let i = 0; i < num; i++) {
      emps.push({
        id: i + 1,
        firstName: `Employee ${i}`,
        lastName: `Desousa ${i}`,
        gender: EmployeeBuilder.gender(),
        age: EmployeeBuilder.age(),
      });
    }
    return emps;
  }

  static gender(): string {
    const value = Math.floor(Math.random() * 10);
    return value > 5 ? "M" : "F";
  }
  static age(): number {
    return Math.floor(Math.random() * 100);
  }
}
