'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = (data) => 
  ApiConnector.logout(data, (response) => {
    if (response.success) {
      location.reload();
    };
  });  

  

ApiConnector.current((response) => {
  if (response.success) {
    return ProfileWidget.showProfile(response.data);
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
  ApiConnector.addMoney((data, response) => {
    if (response.success) {  
      moneyManager.setMessage(response.success, 'Деньги внесены на счет');
      return ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(response.success, 'Деньги не внесены на счет');
    };
  });


/*
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney((data, response) => {
    if (response.success) {  
      moneyManager.setMessage(response.success, 'Конвертация прошла успешно');
      return ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(response.success, 'Ошибка конвертации');
    };
  });
}


moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney((data, response) => {
    if (response.success) {  
      moneyManager.setMessage(response.success, 'Трансфер прошел успешно');
      return ProfileWidget.showProfile(response.data);
    } else {
      moneyManager.setMessage(response.success, 'Ошибка трансфера');
    };
  });
}


  
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response);
    favoritesWidget.updateUsersList();    
  };
}); 

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites((data, response) => {
    if (response.success) {  
      favoritesWidget.setMessage(response.success, 'Пользователь добавлен в список избранных');
      return ProfileWidget.showProfile(response.data);
    } else {
      favoritesWidget.setMessage(response.success, 'Пользователь не был добавлен в список избранных');
    };
  });
}    
  
favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites((data, response) => {
    if (response.success) {  
      favoritesWidget.setMessage(response.success, 'Пользователь добавлен в список избранных');
      return ProfileWidget.showProfile(response.data);
    } else {
      favoritesWidget.setMessage(response.success, 'Пользователь не был добавлен в список избранных');
    };
  });
}    
 */     

  