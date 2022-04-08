from selenium import webdriver
import selenium
import time

driver = webdriver.Chrome("C:/Users/Anioah/Documents/Ingeniería 2/10mo/Gestión del Proceso de Desarrollo de Software/selenium/Drivers C/chromedriver.exe")

driver.maximize_window()
driver.get("http://127.0.0.1:8080")
driver.find_element_by_id("username").send_keys("José Guillermo")
driver.find_element_by_id("password").send_keys("Contraseña")
time.sleep(2)
driver.find_element_by_id("loginbtn").click()
time.sleep(2)
driver.close()