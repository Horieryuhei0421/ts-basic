type Player = 'first' | 'second'
type Suji = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Dan = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

class Position {
  constructor(private suji: Suji, private dan: Dan) {}

  // パラメーターに渡された位置と現在の位置を比較するメソッド
  distanceFrom(position: Position, player: Player) {
    if (player === 'first') {
      return {
        suji: Math.abs(position.suji - this.suji),
        dan: Math.abs(Number(position.dan) - Number(this.dan)),
      }
    } else {
      return {
        suji: Math.abs(position.suji - this.suji),
        dan: -Math.abs(Number(position.dan) - Number(this.dan)), // 段(縦の距離)は正負反転
      }
    }
  }
}

abstract class Piece {
  // このコマがどこにいるのかを表現するプロパティ（classを肩として使える）
  protected position: Position

  constructor(private readonly player: Player, suji: Suji, dan: Dan) {
    // このthisはこのPiece classの中のという意味
    this.position = new Position(suji, dan)
  }

  // パラメーターに渡された位置へ駒を移動するメソッド
  // publicなので、サブクラスでオーバーライド（上書き）できる
  moveTo(position: Position) {
    this.position = position
  }

  // 移動できるかどうか判定するメソッド
  // abstractをつけて宣言しておき、サブクラスで具体的に実装する
  abstract canMoveTo(position: Position, player: Player): boolean
}

// Pieceクラスを継承したOshoクラスを宣言
class Osho extends Piece {
  canMoveTo(position: Position, player: Player): boolean {
    // 移動先に指定された位置(position)と現在の位置(this.position)を比較
    const distance = this.position.distanceFrom(position, player)
    // 移動先との距離が2未満、つまり1マス以内なら移動できる
    return distance.suji < 2 && distance.dan < 2
  }
}

class Game {
  private pieces = Game.makePieces()
  private static makePieces() {
    return [new Osho('first', 5, '1'), new Osho('second', 5, '9')]
  }
}

new Game()
