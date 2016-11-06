'use strict';

function Item(name, effect) {
  this.name = name;
  this.effect = effect;
  this.effect.hp = 5;
  this.effect.mp = 5;
}

function Weapon(name, damage, extraEffect) {
  extraEffect = extraEffect || new Effect({});
  Weapon = Item.prototype.constructor;
  Item.call(this, name, extraEffect);
  extraEffect.hp = - damage;
  extraEffect.mp = - damage;
}
Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;
// Termina de implementar la herencia haciendo que la propiedad prototype de
// Item sea el prototipo de Weapon.prototype y recuerda ajustar el constructor.

function Scroll(name, cost, effect) {
  Item.call(this, name, effect);
  this.cost = cost;
  if (name === 'health') effect.hp = 25;
  if (name === 'fireball') effect.hp = -25;

}
Scroll.prototype = Object.create(Item.prototype);
Scroll.prototype.constructor = Scroll;

Scroll.prototype.canBeUsed = function (mp) {
  // El pergamino puede usarse si los puntos de maná son superiores o iguales
  // al coste del hechizo.
  if (mp >= this.cost) return true;
  else return false;
};

function Effect(variations) {
  for(var name in variations){
    this[name] =variations[name];
  }
}

module.exports = {
  Item: Item,
  Weapon: Weapon,
  Scroll: Scroll,
  Effect: Effect
};
