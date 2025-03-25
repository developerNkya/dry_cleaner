import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';
import { Block, Text, Button, theme } from 'galio-framework';
import { Input, Icon } from '../components';
import { DataTable } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons'; 
import { addLaundry } from '../services/laundryService';
import { Alert } from 'react-native';


const { width } = Dimensions.get('screen');

class AddLaundry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      laundryItems: [], // Initially empty
      showForm: false,
      name: '',
      price: ''
    };
  }

  componentDidMount() {
    this.fetchLaundryItems(1);
  }
  

  fetchLaundryItems = async (nextPage = 1) => {
    try {
      console.log('Fetching page:', nextPage);
  
      const response = await fetch(`http://10.0.2.2:3000/laundry?page=${nextPage}`);
      const data = await response.json();

      console.log(data);
      
  
      this.setState((prevState) => ({
        laundryItems: data.data,
        total: data.total,
        page: nextPage,
        pageCount: data.pageCount
      }));
    } catch (error) {
      console.error('Error fetching laundry items:', error);
      Alert.alert('Error', 'Failed to fetch laundry items.');
    }
  };
  
  

  
  addLaundryItem = async () => {
    const { name, price } = this.state;

    if (!name || !price) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      Alert.alert('Error', 'Price must be a valid number.');
      return;
    }

    try {
      const response = await addLaundry(name, parseFloat(price));

      if (response.status === 201) {
        this.setState({ showForm: false, name: '', price: '' });
        this.fetchLaundryItems(); // Refresh laundry list
        Alert.alert('Success', 'Laundry item added successfully.');
      } else {
        Alert.alert('Error', 'Failed to add laundry item.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };


  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };


  

  
  renderTable = () => {
    return (
      <Block flex style={styles.group}>
        <Text size={16} style={styles.title}>
          Laundry List
        </Text>
        <DataTable style={styles.table}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title numeric>Price ($)</DataTable.Title>
            <DataTable.Title numeric>Edit</DataTable.Title>
          </DataTable.Header>
  
          {this.state.laundryItems.map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>${item.price}</DataTable.Cell>
              <DataTable.Cell numeric>
                <TouchableOpacity>
                  <Icon name="edit" family="FontAwesome" size={16} color="black" />
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
  
        <Block row style={{ marginTop: 10, justifyContent: 'space-between', width: '100%' }}>
  {/* Previous Button */}
  {this.state.page > 1 && (
    <Button
      textStyle={{ fontSize: 12 }}
      color="gray"
      style={[styles.button, { flex: 1, marginRight: 10 }]} // Ensures even spacing
      onPress={() => this.fetchLaundryItems(this.state.page - 1)}
    >
      Previous
    </Button>
  )}

  {/* Next Button */}
  {this.state.page < this.state.pageCount && (
    <Button
      textStyle={{ fontSize: 12 }}
      color="black"
      style={[styles.button, { flex: 1, marginLeft: 10 }]} // Ensures even spacing
      onPress={() => this.fetchLaundryItems(this.state.page + 1)}
    >
      Next
    </Button>
  )}
</Block>



      </Block>
    );
  };
  

  renderForm = () => {
    return (
      <Block flex style={styles.group}>
        <Text size={16} style={styles.title}>
          Add Laundry
        </Text>
         <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                  <Input
                    primary={this.state.primaryFocus}
                    right
                    placeholder="Name"
                    onFocus = {() => this.setState({primaryFocus: true})}
                    onBlur = {() => this.setState({primaryFocus: false})}
                    onChangeText={(text) => this.setState({ name: text })}
                    iconContent={<Block />}
                    shadowless
                  />
          </Block>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                  <Input
                    primary={this.state.primaryFocus}
                    right
                    placeholder="Price"
                    onFocus = {() => this.setState({primaryFocus: true})}
                    onBlur = {() => this.setState({primaryFocus: false})}
                    onChangeText={(text) => this.setState({ price: text })}
                    iconContent={<Block />}
                    shadowless
                  />
          </Block>
        <Block center>
          <Button
            textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
            color="black"
            style={styles.button}
            onPress={this.addLaundryItem}
          >
            ADD LAUNDRY
          </Button>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30, width }}
        >
          {this.state.showForm ? this.renderForm() : this.renderTable()}
        </ScrollView>
        <TouchableOpacity style={styles.floatingButton} onPress={this.toggleForm}>
        <FontAwesome name={this.state.showForm ? 'arrow-left' : 'plus'} size={20} color="white" />

        </TouchableOpacity>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: 'black'
  },
  group: {
    // paddingTop: theme.SIZES.BASE
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AddLaundry;
