var socket = io();
var symbol;
  $(".board button").attr("disabled", true);
  $(".board> button").on("click", makeMove);
  //Change the visibility of the button #replay to 'hidden'
  $("#replay").hide();
  // Event is called when either player makes a move
  socket.on("move.made", function (data) {
    // Render the move
    $("#" + data.position).text(data.symbol);
    // If the symbol is the same as the player's symbol,
    // we can assume it is their turn
    myTurn = data.symbol !== symbol;

    // If the game is still going, show who's turn it is
    if (!isGameOver()) {
      if (gameTied()) {
        $("#messages").text("¡Sin solución!");
        $(".board button").attr("disabled", true);
      } else {
        renderTurnMessage();
      }
      // If the game is over
    } else {
      // Show the message for the loser
      if (myTurn) {
        $("#messages").text("Fin del juego (Pierdes)");
        $("#other").text(parseInt($("#other").text()) + 1);
        // Show the message for the winner
      } else {
        $("#messages").text("Fin del juego (Ganas)");
        $("#me").text(parseInt($("#me").text()) + 1);
      }
      // Disable the board
      $(".board button").attr("disabled", true);
      $("#replay").show();
      $("replay").text("Volver a jugar");
      $("#replay").on("click", function () {
        resetBoard();
      });
    }
  });

  // Set up the initial state when the game begins
  socket.on("game.begin", function (data) {
    // The server will asign X or O to the player
    symbol = data.symbol;
    // Give X the first turn
    myTurn = symbol === "X";
    renderTurnMessage();
  });

  // Disable the board if the opponent leaves
  socket.on("opponent.left", function () {
    $("#messages").text("Tu oponente abandonó la partida");
    $(".board button").attr("disabled", true);
    $("#replay").show();
    $("#replay").text("Reiniciar");
    $("#replay").on("click", function () {
      location.reload();
    });
  });

function getBoardState() {
  var obj = {};
  // We will compose an object of all of the Xs and Ox
  // that are on the board
  $(".board button").each(function () {
    obj[$(this).attr("id")] = $(this).text() || "";
  });
  return obj;
}

function gameTied() {
  var state = getBoardState();

  if (
    state.a0 !== "" &&
    state.a1 !== "" &&
    state.a2 !== "" &&
    state.b0 !== "" &&
    state.b1 !== "" &&
    state.b2 !== "" &&
    state.b3 !== "" &&
    state.c0 !== "" &&
    state.c1 !== "" &&
    state.c2 !== ""
  ) {
    return true;
  }
}

function isGameOver() {
  var state = getBoardState(),
    // One of the rows must be equal to either of these
    // value for
    // the game to be over
    matches = ["XXX", "OOO"],
    // These are all of the possible combinations
    // that would win the game
    rows = [
      state.a0 + state.a1 + state.a2,
      state.b0 + state.b1 + state.b2,
      state.c0 + state.c1 + state.c2,
      state.a0 + state.b1 + state.c2,
      state.a2 + state.b1 + state.c0,
      state.a0 + state.b0 + state.c0,
      state.a1 + state.b1 + state.c1,
      state.a2 + state.b2 + state.c2,
    ];

  // to either 'XXX' or 'OOO'
  for (var i = 0; i < rows.length; i++) {
    if (rows[i] === matches[0] || rows[i] === matches[1]) {
      return true;
    }
  }
}

function resetBoard() {
  $(".board button").attr("disabled", false);
  $(".board button").text("");
  $("#messages").text("");
}


function renderTurnMessage() {
  // Disable the board if it is the opponents turn
  if (!myTurn) {
    $("#switcher").text("J2");
    $("#messages").text("Juega el contrario");
    $(".board button").attr("disabled", true);
    // Enable the board if it is your turn
  } else {
    $("#switcher").text("J1");
    $("#messages").text("Juegas tú");
    $(".board button").removeAttr("disabled");
  }
}

function makeMove(e) {
  e.preventDefault();
  // It's not your turn
  if (!myTurn) {
    return;
  }
  // The space is already checked
  if ($(this).text().length) {
    return;
  }

  // Emit the move to the server
  socket.emit("make.move", {
    symbol: symbol,
    position: $(this).attr("id"),
  });
}