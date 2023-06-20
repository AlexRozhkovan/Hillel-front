class Student {
  constructor(firstName, lastName, birthYear) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.grades = [];
    this.attendance = [];
  }

  present() {
    if (this.attendance.length < 25) {
      this.attendance.push(true);
    } else {
      console.log("Максимальна кількість записів.");
    }
  }

  absent() {
    if (this.attendance.length < 25) {
      this.attendance.push(false);
    } else {
      console.log("Максимальна кількість записів.");
    }
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  get averageGrade() {
    if (this.grades.length === 0) {
      return 0;
    }
    const sum = this.grades.reduce((total, grade) => total + grade, 0);
    return sum / this.grades.length;
  }

  get attendanceRate() {
    return this.attendance.filter((status) => status).length / 25;
  }

  summary() {
    if (this.averageGrade > 90 && this.attendanceRate > 0.9) {
      return "Молодець!";
    } else if (this.averageGrade > 90 || this.attendanceRate > 0.9) {
      return "Добре, але можна краще.";
    } else {
      return "Редиска!";
    }
  }
}
