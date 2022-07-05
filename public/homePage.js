'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = () => 
  ApiConnector.logout ((response) => {
    if (response.success) {
      location.reload();
    };
  });  

  

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  };
}); 

let ratesBoard = new RatesBoard();

ratesBoard.getCourses = () => 
  ApiConnector.getStocks((response) => {
    if (response.success) {  
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    };
  });

ratesBoard.getCourses();
setInterval(ratesBoard.getCourses, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => 
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {  
      moneyManager.setMessage(response.success, 'Баланс пополнен');
      ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(response.success, response.error);
    };
  });



moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {  
      moneyManager.setMessage(response.success, 'Конвертация прошла успешно');
      ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(response.success, response.error);
    };
  });
};


moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {  
      moneyManager.setMessage(response.success, 'Трансфер прошел успешно');
      ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(response.success, response.error);
    };   
  });
};



const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    favoritesWidget.updateUsersList(response.data);    
  };
}); 

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {  
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.setMessage(response.success, 'Пользователь добавлен в список избранных');
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    };  
  });
};    
  
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {  
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.setMessage(response.success, 'Пользователь удален из списка избранных');
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }; 
  });
};   
     

  