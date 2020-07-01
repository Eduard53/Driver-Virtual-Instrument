# Driver-Virtual-Instrument
Driver and Virtual Instrument CLI

To run the program, run the following command in terminal:

	'node driver.js'
or (in labforward_cli directory)

	'driver' 
  
Follow the instructions presented within the CLI

DEFINITION OF DONE

The project is completed to the standard of the documentation provided by illustrating the following requirements.

The driver.js (parent) is the primary driver file for communicating asynchronously with the virtual_instrument.js (child) virtual balance in this instance.
This is done by creating a new child object using the '.fork' which is an asynchronous communication Inter Process Communication (IPC) stream. Commands can 
be sent via running the main node driver.js. The driver sends a message to the child (virtual_instrument.js) which then randomly simulates a result. 
The driver.js is an interactive Command Line Interface (CLI) whereby, the user can dynamically enter commands and interact with the virtual instrument. 

The virtual_instrument.js (child) is simulating a virtual balance that sends the data to the driver.js (parent) when requested. The stable weight value in this 
example is calculated by averaging a simulated number of 10 samples. This is to simulate the fluctuations that may occur whilst the balance is stabilizing. Any 
input value that is received will be converted to a hexadecimal [0x] value and displayed on the CLI. The response from the virtual balance will also be randomised 
according to the documentation for the command. e.g. S I, S S    x.g, S +, S -. The virtual instrument is also responsible for logging and recording the results 
obtained from a successful reading of the balance to a text file.


UNIT TESTS

Unit tests have also been performed on a few of the functions utilising JEST. 
To run the unit tests, be sure to be in the directory of 'labforward_cli' and run:

	'npm test' 
