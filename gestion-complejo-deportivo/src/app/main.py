#Application to show a window with a button and a label
import sys
import os
import subprocess
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton ,QLineEdit,QListWidget
from PyQt5.QtCore import pyqtSlot
 
class App(QWidget):
 
    def __init__(self):
        super().__init__()
        self.title = 'Some Title'
        self.left = 10
        self.top = 10
        self.width = 500
        self.height = 500
        self.initUI()
 
    def initUI(self):
        self.setWindowTitle(self.title)
        #self.setGeometry(self.left, self.top, self.width, self.height)
 
        button = QPushButton('Deploy application', self)
        button.setToolTip('Add')
        button.move(250,250);
        button.resize(300,90)
        button.clicked.connect(self.on_click)
 
        self.show()
 
    @pyqtSlot()
    def on_click(self):
        #deploy application
        subprocess.call([r'deploy.bat'])
        
    @pyqtSlot()
    def onEnterClick(self):
        print('Enter button click')
        self.button.move(400,250);
        
 
if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = App()
    sys.exit(app.exec_())