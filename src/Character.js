'use strict';
var dice = require('./dice');

function Character(name, features) {
  features = features || {};
  this.name = name;
  this.party=features.party||null;
  this.initiative=features.initiative||0;
  this._defense=features.defense||0;
  this.weapon=features.weapon||null;
  this._hp = features.hp || 0;
  this._mp = features.mp || 0;
  this.maxHp = features.maxHp || this._hp||15;
  this.maxMp = features.maxMp || this._mp;

}

Character.prototype._immuneToEffect = ['name', 'weapon'];

Character.prototype.isDead = function () {
  return (this._hp <= 0);
};

Character.prototype.applyEffect = function (effect, isAlly) {
   if(isAlly){
  
  this.party += effect.party|| this.party;
  this.initiative += effect.initiative|| this.initiative;
  this._defense = effect.defense + this._defense || this._defense;
  this._hp = effect.hp + this._hp || this._hp;
  this._mp = effect.mp + this._mp || this._mp;
  this.maxHp = effect.maxHp + this.maxHp|| this.maxHp ;
  this.maxMp = effect.maxMp + this.maxMp  || this.maxMp;
  return true;

  }

  else if(dice.d100()===100){

  this.party += effect.party|| this.party;
  this.initiative += effect.initiative|| this.initiative;
  this._defense = effect.defense + this._defense || this._defense;
  this._hp = effect.hp + this._hp || this._hp;
  this._mp = effect.mp + this._mp || this._mp;
  this.maxHp = effect.maxHp + this.maxHp|| this.maxHp ;
  this.maxMp = effect.maxMp + this.maxMp  || this.maxMp;
  return true;
}
else if(dice.d100()===1){
return false;
}

};

Object.defineProperty(Character.prototype, 'mp', {
  get: function () {
    return this._mp;
  },
  set: function (newValue) {
    this._mp = Math.max(0, Math.min(newValue, this.maxMp));
  }
});

Object.defineProperty(Character.prototype, 'hp', {
	get: function () {
    return this._hp;
  },
  set: function (newValue) {
    this._hp = Math.max(0, Math.min(newValue, this.maxHp));
  }

});

Object.defineProperty(Character.prototype, 'defense', {
  get: function () {
    return this._defense;
  },
  set: function (newValue) {
    this._defense = Math.max(0, Math.min(newValue, 100));
  }

});


module.exports = Character;
