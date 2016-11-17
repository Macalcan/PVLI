'use strict';

function TurnList() {}

TurnList.prototype.reset = function (charactersById) {
  this._charactersById = charactersById;

  this._turnIndex = -1;
  this.turnNumber = 0;
  this.activeCharacterId = null;
  this.list = this._sortByInitiative();
};

TurnList.prototype.next = function () {
var turn = {};
turn.list = this.list;
this._turnIndex = 0;

// se asigna fuera del bucle también para que no sea undefined
this.activeCharacterId = this.list[this._turnIndex]; 
turn.activeCharacterId = this.activeCharacterId;

//en la condicion del bucle he hecho el salto de linea por el lint
while (this._turnIndex < this.list.length 
  && this._charactersById[turn.activeCharacterId].isDead()) {
  this.activeCharacterId = this.list[this._turnIndex];
  turn.activeCharacterId = this.activeCharacterId;
  this._turnIndex++;
}
// volvemos a asignarlo para que party no sea undefined
this.activeCharacterId = turn.activeCharacterId; 
turn.party = this._charactersById[turn.activeCharacterId].party;

this.turnNumber++;
turn.number = this.turnNumber;

return turn;
};

TurnList.prototype._sortByInitiative = function () {
var characters = [];
var initiative = [];

for(var name in this._charactersById){
  characters.push({party: name, initiative: this._charactersById[name].initiative});
}
  characters.sort(function (a,b){
    if ( a !== null && b !== null){//aseguras que a y b no son undefined
      if(a.initiative - b.initiative > 0)
        return -1;
      else if(a.initiative - b.initiative < 0)
        return 1;
      return 0;
    }
  });

  for(var nombre in characters){
    initiative.push(characters[nombre].party);
  }

return initiative;
};

module.exports = TurnList;