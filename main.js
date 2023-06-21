(() => {


  const arrStudents = [];
  const names = ["Анатолий", "Василий", "Иннокентий", "Светлана", "Радмира", "Грегора"];
  const surnames = ["Малин", "Терентьев", "Слоноев", "Харлов", "Марлов", "Плёмин", "Делов"];
  const patronymic = ["Васильевич", "Грегорьевич", "Русланович", "Алмазович", "Олегович"];

  const birthYear = ["15.03.1981", "24.12.1998", "03.06.1997", "06.10.1989", "14.04.1999", "26.07.2000", "28.07.1994", "17.04.2005", "23.02.2004", "23.02.1997"];

  const faculty = [
    "филологический.",
    "философский.",
    "журналистика.",
    "психология.",
    "социология.",
    "исторический.",
    "юридический.",
    "экономический.",
    "искусств.",
    "международных отношений.",
    "политология.",
    "иностранных языков",
    "лингвистика.",
    "романо-германская филология.",
    "восточные и редкие языки.",
    "славянская филология.",
    "переводоведения.",
  ];

  const educYears = [
    "2019-01-31-2022-08-20",
    "2021-09-02-2022-08-20",
    "2019-08-27-2022-08-20",
    "2019-05-04-2021-04-20",
    "2020-10-28-2022-08-20",
    "2021-12-16-2022-08-20",
    "2021-05-06-2022-08-20",
    "2019-02-22-2022-08-20",
    "2018-10-18-2020-01-01",
  ];

  const getCurrentAge = (date) => {
    const d = date.split(".");
    if (typeof d[2] !== "undefined") {
      date = d[2] + "." + d[1] + "." + d[0];
      return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }
    return 0;
  };

  const getCurrentCourseNum = (date) => {
    const d = date.split("-");
    const currentCourseNum = d[3] - d[0];
    const currentMonth = d[5];
    if (currentCourseNum >= 4 && currentMonth - 1 >= 9) {
      return "(Закончил)";
    }
    return currentCourseNum + "курс";
  };

  const getRandomElemArr = (array) => array[Math.floor(Math.random() * array.length)];

  const isFemine = (name) => {
    if (name.substr(-1) === "а") {
      return true;
    } else {
      return false;
    }
  };

  const toFemine = (surname, patronymic) => {
    if (surname) {
      return surname + "а";
    } else {
      return patronymic + "вна";
    }
  };

  class Student {
    name = "";
    subname = "";
    patronymic = "";
    faculty = "";
    birthYear = "";
    educYears = "";

    constructor(name, surname, patronymic, faculty, birthYear, educYears) {
      this.name = name;
      this.faculty = faculty;
      this.birthYear = birthYear;
      this.educYears = educYears;
      if (isFemine(this.name)) {
        this.subname = toFemine(surname, null);
        this.patronymic = toFemine(null, patronymic);
      } else {
        this.subname = surname;
        this.patronymic = patronymic;
      }
    }
  }

  const generateArrOfStudents = (count) => {
    for (let i = 0; i < count; i++) {
      const randomName = getRandomElemArr(names);
      const randomSubname = getRandomElemArr(surnames);
      const randomPatronymic = getRandomElemArr(patronymic);
      const randomFaculty = getRandomElemArr(faculty);
      const randomBirthYear = getRandomElemArr(birthYear);
      const randomEducYears = getRandomElemArr(educYears);

      const student = new Student(randomName, randomSubname, randomPatronymic, randomFaculty, randomBirthYear, randomEducYears);
      arrStudents.push(student);
    }
  };

  generateArrOfStudents(10);

  let htmlElements = [];

  const addStudentInTable = (student) => {
    const table = document.querySelector("thead");
    const tr = document.createElement("tr");
    const tdFullName = document.createElement("td");
    const tdFaculty = document.createElement("td");
    const tdBirthYear = document.createElement("td");
    const tdEducYears = document.createElement("td");
    tdFullName.classList.add("cell");
    tdFaculty.classList.add("cell");
    tdBirthYear.classList.add("cell");
    tdEducYears.classList.add("cell");

    table.append(tr);
    const fullName = `${student.subname} ${student.name} ${student.patronymic}`;
    tdFullName.innerText = fullName;
    tdFaculty.innerText = student.faculty;
    tdBirthYear.innerText = student.birthYear + " (" + "Возраст:" + getCurrentAge(student.birthYear) + ")";
    tdEducYears.innerText = student.educYears + " (" + getCurrentCourseNum(student.educYears) + ")";
    tr.append(tdFullName);
    tr.append(tdFaculty);
    tr.append(tdBirthYear);
    tr.append(tdEducYears);
    htmlElements.push(tr);
  };

  const addStudentsInTable = (students) => {
    for (const student of students) {
      addStudentInTable(student);
    }
  };

  const inputFullname = document.querySelector("#fullname");
  inputFullname.addEventListener("input", (event) => {
    htmlElements.forEach((element) => {
      element.remove();
    });

    if (!event.data) {
      addStudentsInTable(arrStudents);
      return;
    }
    const filtredStudents = arrStudents.filter((student) => {
      const name = student.name;
      const subname = student.subname;
      const patronymic = student.patronymic;
      const fullName = `${student.name} ${student.subname} ${student.patronymic}`;
      if (String(name).startsWith(event.target.value)) {
        return student;
      }
      if (String(subname).startsWith(event.target.value)) {
        return student;
      }
      if (String(patronymic).startsWith(event.target.value)) {
        return student;
      }

    });


    addStudentsInTable(filtredStudents);
  });

  const inputFaculty = document.querySelector("#faculty");
  inputFaculty.addEventListener("input", (event) => {
    htmlElements.forEach((element) => {
      element.remove();
    });

    if (!event.data) {
      addStudentsInTable(arrStudents);
      return;
    }

    const filtredStudents = arrStudents.filter((student) => {
      if (String(student.faculty).startsWith(event.target.value)) {
        return student;
      }
    });
    addStudentsInTable(filtredStudents);
  });

  const inputStartsEduc = document.querySelector("#inputStartsEduc");
  inputStartsEduc.addEventListener("input", (event) => {
    htmlElements.forEach((element) => {
      element.remove();
    });

    if (!event.data) {
      addStudentsInTable(arrStudents);
      return;
    }

    const filtredStudents = arrStudents.filter((student) => {
      if (String(student.educYears).startsWith(event.target.value)) {
        return student;
      }
    });
    addStudentsInTable(filtredStudents);
  });

  const inputEndsEduc = document.querySelector("#inputEndsEduc");
  inputEndsEduc.addEventListener("input", (event) => {
    htmlElements.forEach((element) => {
      element.remove();
    });

    if (!event.data) {
      addStudentsInTable(arrStudents);
      return;
    }

    const filtredStudents = arrStudents.filter((student) => {
      if (String(student.educYears).startsWith(event.target.value, 11)) {
        return student;
      }
    });
    addStudentsInTable(filtredStudents);
  });

  addStudentsInTable(arrStudents);

  //add student

  const openBtn = document.querySelector(".add-student-button");
  const createStudentForm = document.querySelector(".add-student");
  const closeBtn = document.querySelector(".add-student__close-btn");
  const inputValue = document.querySelector("#name");

  openBtn.addEventListener("click", () => {
    createStudentForm.classList.toggle("hide");
  });

  closeBtn.addEventListener("click", () => {
    createStudentForm.classList.toggle("hide");
  });

  const nameInput = document.querySelector("#name");
  const form = document.querySelector("#add-student-form");
  const allInputsInForm = document.querySelectorAll(".add-student__input");

  const calcEducation = (educStartsDate) => {
    const arrOfEducStartsDate = educStartsDate.split('-');
    arrOfEducStartsDate[0] = Number(arrOfEducStartsDate[0]) + Math.floor(Math.random() * 4 + 1);
    return educStartsDate + '-' + arrOfEducStartsDate.join('-');
  }

  calcEducation('2022-11-30');

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const error = document.querySelector(".error");

    error.classList.add("hide");


    if (!(form[0].value && form[1].value && form[2].value && form[3].value && form[4].value && form[5].value)) {
      allInputsInForm.forEach((input) => {
        input.classList.remove("error-input");
        if (!input.value) {
          input.classList.add("error-input");
          error.classList.remove("hide");
        }

      });
      return
    }
      const student = new Student(form[0].value, form[1].value, form[2].value, form[3].value, form[4].value, calcEducation(form[5].value));

      htmlElements.forEach((elem) => {
        elem.remove();
      });

      arrStudents.push(student);
      addStudentsInTable(arrStudents);
    // name, subname, patronymic, faculty, birthYear, educYears

     for (const input of allInputsInForm) {
        input.value = '';
        input.classList.remove('error-input')
        input.classList.remove('input-error')
    }


  });

  //sorting

  const sortFullname = document.querySelector("#sortName");
  const sortFaculty = document.querySelector("#sortFaculty");
  const sortAge = document.querySelector("#sortAge");
  const sortEducYears = document.querySelector('#sortEducYears');

  const reverseString = (str) => {
    const year = str.substr(4)
    const date = str.substr(0, 4);
    return year + date;
  }

  const byField = (field) => {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  };

  const byFieldAge = (field) => {
    return (a, b) => (reverseString(a[field].replace(/[.]/gi, "")) > reverseString(b[field].replace(/[.]/gi, "")) ? -1 : 1);
  };

  const byFieldEducYears = (field) => {
    return (a,b) => (a[field].replace(/[-]/gi, "") > b[field].replace(/[-]/gi, "") ? 1 : -1);
  }

  const sortBySubname = () => {
    const sortedStudents = [];
    htmlElements.forEach((elem) => {
      elem.remove();
    });
    let currentNames = arrStudents.slice();
    currentNames.sort(byField("subname"));
    currentNames.forEach((student) => sortedStudents.push(student));
    addStudentsInTable(sortedStudents);
  };

  const sortByFaculty = () => {
    const sortedStudents = [];
    htmlElements.forEach((elem) => {
      elem.remove();
    });
    let currentNames = arrStudents.slice();
    currentNames.sort(byField("faculty"));
    currentNames.forEach((student) => sortedStudents.push(student));
    addStudentsInTable(sortedStudents);
  };

  const sortByAge = () => {
    const sortedStudents = [];
    htmlElements.forEach((elem) => {
      elem.remove();
    });
    let currentNames = arrStudents.slice();
    currentNames.sort(byFieldAge("birthYear"));
    currentNames.forEach((student) => sortedStudents.push(student));
    addStudentsInTable(sortedStudents);
  };

  const sortByEducYears = () => {
    let sortedStudents = [];
    htmlElements.forEach((elem) => {
      elem.remove();
    });
    let currentNames = arrStudents.slice();
    currentNames.sort(byFieldEducYears("educYears"));
    currentNames.forEach((student) => sortedStudents.push(student));
    addStudentsInTable(sortedStudents);
  }

  sortFullname.addEventListener("click", sortBySubname);
  sortFaculty.addEventListener("click", sortByFaculty);
  sortAge.addEventListener("click", sortByAge);
  sortEducYears.addEventListener("click", sortByEducYears);

  const mainLineCells = document.querySelectorAll(".main-line__cell");

  // name, surname, patronymic, faculty, birthYear, educYears

})();
