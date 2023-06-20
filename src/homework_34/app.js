const student1 = new Student("Іван", "Мазепа", 2000);
student1.grades = [85, 92, 88, 95, 90];

const student2 = new Student("Леся", "Українка", 2001);
student2.present();
student2.absent();
student2.absent();
student2.grades = [92, 95, 88, 91, 89];

const student3 = new Student("Петро", "Сагайдачний", 2000);
for (let i = 0; i < 25; i++) {
  student3.present();
}
student3.grades = [91, 92, 95, 95, 90];

[student1, student2, student3].forEach((student) => {
  console.log("Ім'я:", student.fullName);
  console.log("Вік студента:", student.age);
  console.log("Середній бал студента:", student.averageGrade);
  console.log("Відвідування студента:", student.attendanceRate);
  console.log("Висновок:", student.summary());
  console.log("-----------------------------");
});
