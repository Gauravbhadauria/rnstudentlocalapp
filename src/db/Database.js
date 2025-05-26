import SQLite from 'react-native-sqlite-storage';

// db creation

export const db = SQLite.openDatabase(
  {
    name: 'studentaap.db',
    location: 'default',
  },
  () => {
    console.log('database created');
  },
  error => {
    console.log('error', error);
  },
);

// table creation

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(`
    CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    fees INTEGER
    );
    `);
    tx.executeSql(`
    CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    course_id INTEGER,
    FOREIGN KEY(course_id) REFERENCES courses(id)
    );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      course_id INTEGER,
      FOREIGN KEY(course_id) REFERENCES courses(id)
    );
    `);
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      date TEXT,
      status TEXT,
      FOREIGN KEY (student_id) REFERENCES students(id)
);`);
  });
};

// CRUD

export const insertCourse = (name, fees, success, error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM courses WHERE name=?',
        [name],
        (_, {rows}) => {
          if (rows.length > 0) {
            error('course already exists');
          } else {
            tx.executeSql(
              'INSERT INTO courses (name,fees) VALUES (?,?)',
              [name, fees],
              (_, res) => {
                success(res);
              },
              (_, err) => {
                error(err);
              },
            );
          }
        },
        (_, err) => error(err),
      );
    },
    err => {
      console.log('Transaction Error:', err);
      error(err);
    },
  );
};

export const getCourses = callback => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM courses', [], (_, {rows}) => {
      const result = [];
      for (let i = 0; i < rows.length; i++) {
        result.push(rows.item(i));
      }
      callback(result);
    });
  });
};

export const deleteCourse = (id, success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM courses where id=?',
      [id],
      res => {
        success(res);
      },
      err => {
        error(err);
      },
    );
  });
};

export const updateCourse = (id, newName, newFees, success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM courses WHERE name =? AND id!=?',
      [newName, id],
      (_, {rows}) => {
        if (rows.length > 0) {
          error('course with this name already exists');
        } else {
          tx.executeSql(
            'UPDATE courses SET name =? ,fees=? where id=?',
            [newName, newFees, id],
            (_, res) => {
              success(res);
            },
            (_, er) => {
              error(er);
            },
          );
        }
      },
      err => {
        error(err);
      },
    );
  });
};

export const insertSubject = (name, courseId, success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM subjects WHERE name=? AND course_id=?',
      [name, courseId],
      (_, {rows}) => {
        if (rows.length > 0) {
          error('subject already exists');
        } else {
          tx.executeSql(
            'INSERT INTO subjects (name,course_id) VALUES (?,?)',
            [name, courseId],
            (_, res) => {
              success(res);
            },
            (_, err) => {
              error(err);
            },
          );
        }
      },
      err => {
        error(err);
      },
    );
  });
};

export const getSubjects = (success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT subjects.id, subjects.name AS subject_name, courses.name AS course_name FROM subjects INNER JOIN courses ON subjects.course_id = courses.id',
      [],
      (_, {rows}) => {
        console.log('rows', rows.item);
        const items = [];
        for (let i = 0; i < rows.length; i++) {
          items.push(rows.item(i));
        }
        success(items);
      },
      (_, err) => {
        error(err);
      },
    );
  });
};

export const getSubjectsByCourseId = (courseId, callback, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM subjects where course_id=?',
      [courseId],
      (_, {rows}) => {
        if (rows.length > 0) {
          const items = [];
          for (let i = 0; i < rows.length; i++) {
            items.push(rows.item(i));
          }
          callback(items);
        } else {
          error('no subjects exist in this course');
        }
      },
    );
  });
};

export const insertStudent = (
  name,
  email,
  password,
  courseId,
  success,
  error,
) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO students (name, email, password, course_id) VALUES (?, ?, ?, ?)',
      [name, email, password, courseId],
      (_, res) => {
        success(res);
      },
      (_, err) => {
        error(err);
      },
    );
  });
};

export const loginStudent = (email, password, callback, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM students where email=? AND password=?',
      [email, password],
      (_, {rows}) => {
        if (rows.length > 0) {
          callback(rows.item(0));
        } else {
          error('no user found');
        }
      },
      (_, err) => {
        error(err);
      },
    );
  });
};

export const markAttendance = (date, student_id, status, success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM attendance WHERE date=? AND student_id=?',
      [date, student_id],
      (_, {rows}) => {
        if (rows.length > 0) {
          error('already marked');
        } else {
          tx.executeSql(
            'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
            [student_id, date, status],
            (_, res) => {
              success(res);
            },
            (_, err) => {
              error(err);
            },
          );
        }
      },
    );
  });
};

export const getAttendanceByMonth = (
  studentId,
  month,
  year,
  callback,
  error,
) => {
  console.log('studentId', studentId);
  const mMonth = month.toString().padStart(2, '0');
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM attendance WHERE student_id=? AND strftime('%m',date)=? AND strftime('%Y',date)=? ORDER BY date ASC`,
      [studentId, mMonth, year.toString()],
      (_, {rows}) => {
        console.log(rows);
        const data = [];
        for (let i = 0; i < rows.length; i++) {
          data.push(rows.item(i));
        }
        callback(data);
      },
      (_, err) => {
        error(err);
      },
    );
  });
};
