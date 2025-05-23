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
