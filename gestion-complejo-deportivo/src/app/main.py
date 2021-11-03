## Buttons to run the different functions

##Depedencies
import sys
import os

##Console application
from PyQt5.QtWidgets import *
from PyQt5.QtGui import QIcon
from PyQt5 import *


##Start of the main window
class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.title = 'PyQt5 file dialogs - pythonspot.com'
        self.left = 10
        self.top = 10
        self.width = 640
        self.height = 480
        self.initUI()

    def initUI(self):
        self.setWindowTitle(self.title)
        self.setGeometry(self.left, self.top, self.width, self.height)

        self.button = QtWidgets.QPushButton('Open', self)
        # connect button to function on_click
        self.button.clicked.connect(self.on_deploy)

        self.show()

    def on_deploy(self):
        # Create a text dialog
        text, ok = QInputDialog.getText(self, 'Input Dialog', 'Enter your name:')
        if text == "Deploy":
            self.deploy();
        if text == "Develop":
            self.develop();
        else :
            print("Nothing")


    def deploy(self):
        print("Executing")
        return self
    def develop(self):
        print("Developing")
        return self

    ##End of the main window

    ##Start of the main function

if __name__ == '__main__':
        app = QApplication(sys.argv)
        ex = MainWindow()
        sys.exit(app.exec_())