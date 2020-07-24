import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class TaskBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // items: ['Eat peanutbutter','comb moustache']
    }

    // this.onClickHandle = this.onClickHandle.bind(this);
    
  }
 
  taskDone(task){
    console.log('task ' + task)
    this.props.taskDone(task);
  }

  render (){
    const listname = this.props.listname;
    const propListItems = this.props.items;
    // console.log("stateListItems " + propListItems)

    const listItems = propListItems.map((item) => <li className={'list-group-item'} key={item} onClick={()=> this.taskDone(item)}>{item}</li>);
  
    return(
      <div>
        <h3>{listname}</h3>
        {(propListItems.length === 0 && listname === 'ToDo') ?
          <li className={'list-group-item list-group-item-success'}>Nothing to do, have a chill</li>:<div></div>
        }
        <ul className={listname + ' list-group'}>{listItems}</ul>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
      
    // We declare the state as shown below
    
    this.state = {                           
      value: '',
      newtask: '',
      tasks: ['Eat peanutbutter','Comb moustache'],
      // tasks: ['Task 1','task 2'],
  
      deadlist: ['I am done']
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.taskDone = this.taskDone.bind(this)
    this.addFunList = this.addFunList.bind(this)
  }

  handleClick(e){
    e.preventDefault()
    if (this.state.value === ''){
      return
    }
    else {
      this.setState({newtask:this.state.value})
      this.setState((state, props) =>( {tasks: state.tasks.concat(state.newtask)}))
      this.setState({value: ''});
    }
  };

  handleChange(e){
    e.preventDefault()
    this.setState({value: e.target.value});
    // console.log(e.target.value)
  }

  addFunList(){
    this.setState((state)=>({tasks: this.state.tasks.concat('something fun')}))
  }

  taskDone(task){
    console.log('task' + task)
    // Only run through this function if the task is not empty
    if (task === []){
      console.log('empty')
      return
    } else {
      console.log('Task Done called')
      // Gets the task and removes it from the tasks list and add it to the deadlist.
      // Get position of item in tasks
      const pos = this.state.tasks.indexOf(task)
      console.log('pos = ' + pos)
      // copy arrays
      const prevTasks = [...this.state.tasks];
      console.log('1prevTasks ' + prevTasks)
      const prevDeadList = [...this.state.deadlist];

      console.log('prevTasks ' + prevTasks)
      console.log('prevTasks concat ' + prevTasks[pos])

      // add old item to deadlist
      this.setState((state) => ({deadlist: prevDeadList.concat(prevTasks[pos])}))
      console.log('deadlist ' + this.state.deadlist)

      // remove item from original list
      const copyPrevTasks = [...this.state.tasks];
      copyPrevTasks.splice(pos,1)
      this.setState((state)=> ({tasks: copyPrevTasks}))}

      // this.addFunList()  

  }

  doneItemHandle(task){
    console.log('done item handle')
  }

  render() {
    return (
      <div className='container'>
        <form>
          <input type='text' placeholder='Enter todo stuff here' value={this.state.value} onChange={this.handleChange} />
          <button onClick={this.handleClick}>Button time</button>
        </form>
        <TaskBox items={this.state.tasks} listname='ToDo' taskDone={this.taskDone}/>
        <TaskBox items={this.state.deadlist} listname='Done'taskDone={ this.doneItemHandle} />
      </div>
      
    );
  }
}






export default App;