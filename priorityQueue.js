class QElement
{
  constructor(elementx , elementy ,priority)
  {
      this.elementx = elementx;
      this.elementy = elementy;
      this.priority = priority;
  }
}

class pq
{
    constructor()
    {
      this.item = [];
    }

    enqueue(elementx , elementy , priority)
    {
      var qe = new QElement(elementx , elementy , priority);
      var contain = false;

      for(var i = 0 ; i < this.item.length ; i++)
      {
        if(this.item[i].priority > qe.priority)
        {
          this.item.splice(i,0,qe);
          contain = true;
          break;
        }
      }

      if(!contain)
      {
        this.item.push(qe);
      }
    }

    dequeue()
    {
      if(this.item.length != 0)
      {
        let q = this.item.shift();
        return {
          x : q.elementx,
          y : q.elementy
        };
      }
      else
      {
        console.log("PQ EMPTY");
      }
    }
}
