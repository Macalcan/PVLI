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
this.turnNumber++;
var turn= {};
turn.number = this.turnNumber;
turn.list = this.list;
var i=0;
while(i<this.list.length && !this._charactersById[turn.list[i]].isDead()) {
i++;}
//i--;

turn.activeCharacterId = turn.list[i];
turn.party = this._charactersById[turn.activeCharacterId].party;
this.activeCharacterId = turn.activeCharacterId;
return turn;
};


TurnList.prototype._sortByInitiative = function () {
var characters = [];
var initiative =[];

for(var name in this._charactersById){
  characters.push({party: name, initiative: this._charactersById[name].initiative});
};
  characters.sort(function (a,b){
    if ( a !== null && b !== null){//aseguras que a y b no son undefined
      if(a.initiative > b.initiative)
        return -1;
      else if(a.initiative <b.initiative)
        return 1;
      return 0;
    }
  })

  for(var nombre in characters){
    initiative.push(characters[nombre].party);
  }

return initiative;
};

module.exports = TurnList;