var db = window.openDatabase("Lam_Thao_Cosmetics","1.0","Lam Thảo Cosmetics", 200000);

function initialize_database() {
    db.transaction(function(tx) {
      var query = `CREATE TABLE IF NOT EXISTS city (
                          id INTEGER PRIMARY KEY,
                          name TEXT UNIQUE NOT NULL)`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('city'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS district (
                          id INTEGER PRIMARY KEY,
                          name TEXT UNIQUE NOT NULL,
                          city_id INTEGER NOT NULL,
                          FOREIGN KEY (city_id) REFERENCES city(id))`;

          tx.executeSql(
          query, 
          [], 
          table_transaction_success('district'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS ward (
                          id INTEGER PRIMARY KEY,
                          name TEXT UNIQUE NOT NULL,
                          district_id INTEGER NOT NULL,
                          FOREIGN KEY (district_id) REFERENCES district(id))`;

          tx.executeSql(
          query, 
          [], 
          table_transaction_success('ward'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS category (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name TEXT UNIQUE NOT NULL,
                          description TEXT NULL,
                          parent_id INTEGER NULL,
                          FOREIGN KEY (parent_id) REFERENCES category(id))`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('category'),
          transaction_fail
      );
      
      query = `CREATE TABLE IF NOT EXISTS product (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          name TEXT UNIQUE NOT NULL,
                          description TEXT NULL,
                          price REAL NOT NULL,
                          image TEXT NULL,
                          category_id INTEGER NOT NULL,
                          FOREIGN KEY (category_id) REFERENCES category(id))`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('product'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS cart (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          account_id INTEGER NOT NULL,
                          product_id INTEGER NOT NULL,
                          quantity INTEGER NOT NULL,
                          FOREIGN KEY (account_id) REFERENCES account(id),
                          FOREIGN KEY (product_id) REFERENCES product(id))`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('cart'),
          transaction_fail
      );

      query = `CREATE TABLE IF NOT EXISTS account (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          username TEXT UNIQUE NOT NULL,
                          password TEXT NOT NULL,
                          firstname TEXT NULL,
                          lastname TEXT NULL,
                          birthday REAL NULL,
                          phone TEXT NULL,
                          ward_id INTEGER NULL,
                          district_id INTEGER NULL,
                          city_id INTEGER NULL,
                          status INTEGER NOT NULL,
                          FOREIGN  KEY (city_id) REFERENCES city(id),
                          FOREIGN  KEY (ward_id) REFERENCES ward(id),
                          FOREIGN  KEY (district_id) REFERENCES district(id))`;

      tx.executeSql(
          query, 
          [], 
          table_transaction_success('account'),
          transaction_fail
      );
  });
}

function fetch_database() {
  db.transaction(function(tx) {
      var query = `INSERT INTO category (name) VALUES (?)`;

      tx.executeSql(query, ['MERZY'], insert_transaction_success('MERZY'), transaction_fail);
        tx.executeSql(query, ['3CE'], insert_transaction_success('3CE'), transaction_fail);

        query = `INSERT INTO product (name, price, category_id, image) VALUES (?, ?, ?, ?)`;
        tx.executeSql(query, ['Son Kem Lì Merzy Dreamy Late Night Mellow Tint - A Late Night Mood Version', 159000, '1', 'https://product.hstatic.net/200000135107/product/z2552351870018_4cdd416c2d06529e2de8f85a2d0513f9_c13c4badcb9047c8abd0d0bebe97bac5_grande.jpg'], insert_transaction_success('Product 01'), transaction_fail);
        tx.executeSql(query, ['Son Kem Lỳ Merzy The Heritage Velvet Tint', 198000, '1', 'https://product.hstatic.net/200000135107/product/z2446765822604_abb7286841771c89bd168c1befa67392_9e2c2c080e5148cf8dd15b93daa922c6_grande.jpg'], insert_transaction_success('Product 02'), transaction_fail);
        tx.executeSql(query, ['Son Merzy Bite The Beat Mellow Tint', 180000, '1', 'https://product.hstatic.net/200000135107/product/8809211656165__39___1__15fb707de8da45bfab9ea9ee92c1da7a_grande.jpg'], insert_transaction_success('Product 03'), transaction_fail);
        tx.executeSql(query, ['Son Kem Merzy The First Velvet Tint', 180000, '1', 'https://product.hstatic.net/200000135107/product/merzy_kem_9e702efcc7f44e589f37155466581c79_08f90f73454b4e6cbc8c527b3a828fea_grande.jpg'], insert_transaction_success('Product 04'), transaction_fail);
        tx.executeSql(query, ['Son Kem Lì Merzy Velvet Tint Season 1', 199000, '1', 'https://product.hstatic.net/200000135107/product/v4_36ba160188d9410b9158343eb453c440_grande-removebg-preview_5b1a33ac6ace4da6a5889e272cca4248_grande.png'], insert_transaction_success('Product 05'), transaction_fail);
        tx.executeSql(query, ['Son Kem 3CE Cloud Lip Tint', 320000, '2', 'https://product.hstatic.net/200000135107/product/new_project__31___1__155a140493a6409989f3b53879043dfa_grande.jpg'], insert_transaction_success('Product 06'), transaction_fail);
        tx.executeSql(query, ['Son Kem 3CE Soft Lip Lacquer', 320000, '2', 'https://product.hstatic.net/200000135107/product/new_project__32___1__c15f1526a9124599a4050b62e32bf2e6_medium.jpg'], insert_transaction_success('Product 07'), transaction_fail);
        tx.executeSql(query, ['Son Kem 3CE Soft Lip Lacquer', 250000, '2', 'https://product.hstatic.net/200000135107/product/new_project__33___1__e89f7d08d3144257ab68c370ab10e1ac_grande.jpg'], insert_transaction_success('Product 08'), transaction_fail);
        tx.executeSql(query, ['Son Kem 3CE Blur Water Tint', 350000, '2', 'https://product.hstatic.net/200000135107/product/son_kem_3ce_blur_water_tint_9b2f54bd0b004e6d9638b61e289ee075_grande.jpg'], insert_transaction_success('Product 09'), transaction_fail);

      
      query = `INSERT INTO account (username, password, status) VALUES (?, ?, ?)`;
      tx.executeSql(query, ['asm123', '123', 1], insert_transaction_success('asm123'), transaction_fail); 
  });
};

function insert_transaction_success(name) {
    log(`INFO`, `Insert ${name} successfully.`)
};

function table_transaction_success(table_name) {
    log(`INFO`, `Create table ${table_name} successfully.`)
};

function log(type, message) {
    var current_time = new Date();
    console.log(`${current_time} [${type}] ${message}`);
};
  
function transaction_fail(tx, error) {
    log(`ERROR`, `SQL Error ${error.code}: ${error.message}.`); 
};
