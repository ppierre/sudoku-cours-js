// = Classe SudokuViewGrid (correction)=
//
// Fais la correspondance entre les saisies de l'utilisateur 
// et un tableau de tableau contenant les valeurs saisies.

/*global Class $ Element*/


var SudokuViewGrid = new Class({
  
// == Constructeur
// 
// Recoit : 
// * l'élément ou insérer le code HTML 
// * et un tableau de valeurs initiales

  initialize: function (element, data) {
    var size = 9,
        base = $(element),
        tableau;
    this.data = data;
    this.base = base;
    tableau = new Element('tbody');
    size.times(function (i_ligne) {
      var ligne = new Element('tr');
      size.times(function (i_col) {
        var val = data[i_ligne][i_col],
            td_class = "",
            input = new Element('input', {
            'type': 'text',
            'size': 1,
            'maxlength': 1,
            'value': val || "",
            'id': base.get('id') + i_ligne.toString() + i_col.toString(),
            'events': this.make_event(i_ligne, i_col)
          });
        if (!(val === 0)) {
          input.set('readonly', true);
          input.addClass('readonly');
          td_class = 'readonly';
        }
        if (i_col === 2 || i_col === 5) {
          td_class += ' border_right';
        }
        if (i_ligne === 2 || i_ligne === 5) {
          td_class += ' border_bottom';
        }
        ligne.grab(new Element('td', {'class': td_class}).grab(input));
      }, this);
      tableau.grab(ligne);
    }, this);
    base.grab(new Element('table', {
      'class': 'sudoku_grid',
      'cellspacing': 0
    }).grab(tableau));
  },

// == {{{SudokuViewGrid:get}}}
//
// Reçoit :
// * l'indice de la ligne
// * l'indice de la colonne
//
// Retourne la valeurs corespondant a cette position

  get: function (i_ligne, i_col) {
    return this.data[i_ligne][i_col];
  },

// == {{{SudokuViewGrid:get}}}
//
// Reçoit :
// * l'indice de la ligne
// * l'indice de la colonne
// * la nouvelle valeur
//
// Retourne l'objet lui-même

  set: function (i_ligne, i_col, value) {
    this.data[i_ligne][i_col] = value;
    this.base.getElementById(this.base.get('id') + i_ligne.toString() + i_col.toString()).
      set('value', value || "");
    return this;
  },

// == {{{SudokuViewGrid:make_event}}}
//
// Reçoit :
// * l'indice de la ligne
// * l'indice de la colonne
//
// Retourne un objet contenant les événements

  make_event: function (i_ligne, i_col) {
    var size = 9,
        base = this.base,
        data = this.data;

// === {{{apply_to_coo}}}
//
// Reçoit :
// * La fonction à appliquer
// * l'indice de la ligne
// * l'indice de la colonne

    var apply_to_coo = function (fun, i_ligne, i_col) {
      var id = base.get('id') + i_ligne.toString() + i_col.toString();
      fun($(id));
    };

// === {{{apply_to_line}}}
//
// Reçoit :
// * La fonction à appliquer
// * l'indice de la ligne

    var apply_to_line = function (fun) {
      size.times(function (i_col) {
        apply_to_coo(fun, i_ligne, i_col);
      });
    };

// === {{{apply_to_col}}}
//
// Reçoit :
// * La fonction à appliquer
// * l'indice de la colonne

    var apply_to_col = function (fun) {
      size.times(function (i_ligne) {
        apply_to_coo(fun, i_ligne, i_col);
      });
    };

// === {{{apply_to_cell}}}
//
// Reçoit :
// * La fonction à appliquer

    var apply_to_cell = function (fun) {
      size.times(function (n_i_ligne) {
        size.times(function (n_i_col) {
          if (((Math.floor(n_i_ligne / 3) === Math.floor(i_ligne / 3))) &&
              (Math.floor(n_i_col / 3) === Math.floor(i_col / 3))) {
            apply_to_coo(fun, n_i_ligne, n_i_col);
          }
        });
      });
    };

// === {{{funAddClass}}}
// 
// Reçoit :
// * la class
// 
// Retourne :
// * une fonction qui ajoute la class à un élément reçu en paramètre
// ** ainsi qu'a son parent.

    var funAddClass = function (a_class) {
      return function (elem) {
        elem.addClass(a_class);
        elem.getParent().addClass(a_class);
      };
    };

// === {{{funRemoveClass}}}
// 
// Reçoit :
// * la class
// 
// Retourne :
// * une fonction qui retire la class à un élément reçu en paramètre
// ** ainsi qu'a son parent.

    var funRemoveClass = function (a_class) {
      return function (elem) {
        elem.removeClass(a_class);
        elem.getParent().removeClass(a_class);
      };
    };

// === Les événements

    return {

// ==== Change ou efface la valeur

      'keypress': function (event) {
        var input = event.target;
        if (!$(input).get('readonly')) {
          var key_num = parseInt(event.key, 10);
          if (0 < key_num && key_num < 10) {
            input.set('value', key_num);
            data[i_ligne][i_col] = key_num;
            event.stop();
          } else {
            if (event.key.length === 1 ||
                event.key === "space" ||
                event.key === "delete" ||
                event.key === "backspace") {
              input.set('value', '');
              data[i_ligne][i_col] = 0;
              event.stop();
            }
          }
        }
      },

// ==== Déplace le focus

      'keydown': function (event) {
        var ligne = i_ligne,
            col = i_col;
        switch (event.key) {
        case "up":
          ligne -= 1;
          break;
        case "down":
          ligne += 1;
          break;
        case "left":
          col -= 1;
          break;
        case "right":
          col += 1;
          break;
        }
        $(base.get('id') +
          ligne.limit(0, 8).toString() + 
          col.limit(0, 8).toString()).focus();
      },

// ==== Mets à jour les styles

      'blur': function (event) {
        var remove_highlight = funRemoveClass('highlight');

// = Exemple : l'application manuelle des fonctions
// 
// * apply_to_line
// * apply_to_coo
// * fun = funRemoveClass
// ** a_class = 'highlight'
// 
// idem :
// {{{apply_to_line(funRemoveClass('highlight'));}}}

        size.times(function (i_col) {
          var id = base.get('id') + i_ligne.toString() + i_col.toString();
          var elem = $(id);
          elem.removeClass('highlight');
          elem.getParent().removeClass('highlight');
        });
        
// ==== 
        
        apply_to_col(remove_highlight);
        apply_to_cell(funRemoveClass('highlight_grid'));
      },
      'focus': function (event) {
        var add_highlight = funAddClass('highlight');
        apply_to_line(add_highlight);
        apply_to_col(add_highlight);
        apply_to_cell(funAddClass('highlight_grid'));
      }
    };
  }
});