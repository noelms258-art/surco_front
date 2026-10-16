import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PInicioSesion from '../../pantallas/PInicioSesion';
import PMenuPrincipal from '../../pantallas/PMenuPrincipal';
import PCampos from '../../pantallas/explotaciones/PCampos';
import PCampo from '../../pantallas/explotaciones/PCampo';
import PAñadirProducto from '../../pantallas/gastos/gastosAgricolas/PAñadirProducto';
import PTratamientos from '../../pantallas/explotaciones/Tratamientos/PTratamientos';
import PAñadirTratamientos from '../../pantallas/explotaciones/Tratamientos/PAñadirTratamientos';
import PTareas from '../../pantallas/explotaciones/Tareas/PTareas';
import PPlanAbonado from '../../pantallas/explotaciones/PlanAbonado/PPlanAbonado';
import PCrearPlanAbon from '../../pantallas/explotaciones/PlanAbonado/PCrearPlanAbon';
import PEditarPlanAbonado from '../../pantallas/explotaciones/PlanAbonado/PEditarPlanAbonado';
import PCumplimientoAbonado from '../../pantallas/explotaciones/PCumpliminetoAbonado';
import PVisualizarPlan from '../../pantallas/explotaciones/PlanAbonado/PVisualizarPlan';
import PReportes from '../../pantallas/reportes/PReportes';
import PReportesEconomicos from '../../pantallas/reportes/PReportesEconomicos';
import PGastos from '../../pantallas/gastos/PGastos';
import PGastosAgricolas from '../../pantallas/gastos/gastosAgricolas/PGastosAgricolas';
import PGastosOperativos from '../../pantallas/gastos/gastosOperativos/PGastosOperativos';
import PGastosAdministrativos from '../../pantallas/gastos/gastosAdministrativos/PGastosAdministrativos';
import PCuadernoCampo from '../../pantallas/reportes/CuadernoCampo/PCuadernoCampo';
import PDetalleCampos from '../../pantallas/reportes/PDetalleCampos';
import PIngresos from '../../pantallas/gastos/ingresos/PIngresos';
import PAñadirGastoOperativo from '../../pantallas/gastos/gastosOperativos/PAñadirGastoOperativo';
import PAñadirGastoAdmin from '../../pantallas/gastos/gastosAdministrativos/PAñadirGastoAdmin';
import PGastosActivos from '../../pantallas/gastos/gastosActivos/PGastosActivos';
import PAñadirActivo from '../../pantallas/gastos/gastosActivos/PAñadirActivo';
import PAñadirIngreso from '../../pantallas/gastos/ingresos/PAñadirIngreso';
import PRegistro from '../../pantallas/registro/PRegistro';
import PAñadirTarea from '../../pantallas/explotaciones/Tareas/PAñadirTarea';
import PDetalleCampo from '../../pantallas/reportes/PDetalleCampo';
import PRegistroExplotaciones from '../../pantallas/registro/registroExplotaciones/PRegistroExplotaciones';
import PAñadirExplotacion from '../../pantallas/registro/registroExplotaciones/PAñadirExplotacion';

import { RegistroProvider } from '../utils/RegistroContext';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <RegistroProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#37653A',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center'
        }}>
          <Stack.Screen
            name='SURCO'
            component={PInicioSesion}
          />
          <Stack.Screen
            name='Menu Principal'
            component={PMenuPrincipal}
          />
          <Stack.Screen
            name='Campos'
            component={PCampos}
            options={({ navigation }) => ({
              title: 'Campos',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Menu Principal' }]
                    });
                  }}
                  style={{ paddingRight: 15 }}>
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#fff" />
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen
            name='Campo'
            component={PCampo}
            options={({ route }) => ({
              title: route?.params?.nomCampo ?? 'Campo'
            })}
          />
          <Stack.Screen
            name='Gastos'
            component={PGastos}
            options={({ navigation }) => ({
              title: 'Gastos',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Menu Principal' }]
                    });
                  }}
                  style={{ paddingRight: 15 }}>
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#fff" />
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen
            name='Gastos Agricolas'
            component={PGastosAgricolas}
            options={({ navigation }) => ({
              title: 'Gastos Agricolas',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Gastos' }]
                    });
                  }}
                  style={{ paddingRight: 15 }}>
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#fff" />
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen
            name='Gastos Operativos'
            component={PGastosOperativos}
            options={({ navigation }) => ({
              title: 'Gastos Operativos',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Gastos' }]
                    });
                  }}
                  style={{ paddingRight: 15 }}>
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#fff" />
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen
            name='Gastos Administrativos'
            component={PGastosAdministrativos}
            options={({ navigation }) => ({
              title: 'Gastos Administrativos',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Gastos' }]
                    });
                  }}
                  style={{ paddingRight: 15 }}>
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#fff" />
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen
            name='Añadir Gastos Administrativos'
            component={PAñadirGastoAdmin}
            options={({ navigation, route }) => ({
              title: 'Gastos Administrativos',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    if (route.params?.primeraEntrada) {
                      navigation.popTo('Gastos');
                    } else {
                      navigation.goBack();
                    }
                  }}
                  style={{
                    paddingRight: 15,
                    paddingVertical: 5,
                  }}
                >
                  <Ionicons
                    name="arrow-back"
                    size={28}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name='Añadir Producto'
            component={PAñadirProducto}
            options={({ navigation, route }) => ({
              title: 'Gastos agrícolas',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    if (route.params?.primeraEntrada) {
                      navigation.popTo('Gastos');
                    } else {
                      navigation.goBack();
                    }
                  }}
                  style={{
                    paddingRight: 15,
                    paddingVertical: 5,
                  }}
                >
                  <Ionicons
                    name="arrow-back"
                    size={28}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name='Tratamientos'
            component={PTratamientos}
          />
          <Stack.Screen
            name='Añadir Tratamientos'
            component={PAñadirTratamientos}
          />
          <Stack.Screen
            name='Tareas'
            component={PTareas}
          />
          <Stack.Screen
            name='Añadir tarea'
            component={PAñadirTarea}
            options={({ navigation, route }) => ({
              title: 'Tareas',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    if (route.params?.primeraEntrada) {
                      navigation.popTo('Campo');
                    } else {
                      navigation.goBack();
                    }
                  }}
                  style={{
                    paddingRight: 15,
                    paddingVertical: 5,
                  }}
                >
                  <Ionicons
                    name="arrow-back"
                    size={28}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name='Plan abonado'
            component={PPlanAbonado}
          />
          <Stack.Screen
            name='Crear plan abonado'
            component={PCrearPlanAbon}
          />
          <Stack.Screen
            name='Editar plan abonado'
            component={PEditarPlanAbonado}
          />
          <Stack.Screen
            name='Cumplimiento abonado'
            component={PCumplimientoAbonado}
          />
          <Stack.Screen
            name='Visualizar plan abonado'
            component={PVisualizarPlan}
          />
          <Stack.Screen
            name='Reportes'
            component={PReportes}
          />
          <Stack.Screen
            name='Reportes ecónomicos'
            component={PReportesEconomicos}
          />
          <Stack.Screen
            name='Detalle campos'
            component={PDetalleCampos}
          />
          <Stack.Screen
            name='Cuaderno de campo'
            component={PCuadernoCampo}
          />
          <Stack.Screen
            name='Ingresos'
            component={PIngresos}
            options={({ navigation }) => ({
              title: 'Ingresos',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Gastos' }]
                    });
                  }}
                  style={{ paddingRight: 15 }}>
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#fff" />
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen
            name='Añadir gasto operativo'
            component={PAñadirGastoOperativo}
            options={({ navigation, route }) => ({
              title: 'Gastos operativo',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    if (route.params?.primeraEntrada) {
                      navigation.popTo('Gastos');
                    } else {
                      navigation.goBack();
                    }
                  }}
                  style={{
                    paddingRight: 15,
                    paddingVertical: 5,
                  }}
                >
                  <Ionicons
                    name="arrow-back"
                    size={28}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name='Compra de activos'
            component={PGastosActivos}
          />
          <Stack.Screen
            name='Añadir activos'
            component={PAñadirActivo}
          />
          <Stack.Screen
            name='Añadir ingreso'
            component={PAñadirIngreso}
            options={({ navigation, route }) => ({
              title: 'Ingresos',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    if (route.params?.primeraEntrada) {
                      navigation.popTo('Gastos');
                    } else {
                      navigation.goBack();
                    }
                  }}
                  style={{
                    paddingRight: 15,
                    paddingVertical: 5,
                  }}
                >
                  <Ionicons
                    name="arrow-back"
                    size={28}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name='Detalle campo'
            component={PDetalleCampo} />
          <Stack.Screen
            name='Registro usuario'
            component={PRegistro} />
          <Stack.Screen
            name='Registro explotaciones'
            component={PRegistroExplotaciones} 
            options={({ navigation }) => ({
              title: 'Registro explotaciones',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Registro usuario' }]
                    });
                  }}
                  style={{ paddingRight: 15 }}>
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#fff" />
                </TouchableOpacity>
              )
            })}/>
            <Stack.Screen
            name='Añadir explotacion'
            component={PAñadirExplotacion} 
            options={({ navigation, route }) => ({
              title: 'Registro explotaciones',

              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    if (route.params?.primeraEntrada) {
                      navigation.popTo('Registro usuario');
                    } else {
                      navigation.goBack();
                    }
                  }}
                  style={{
                    paddingRight: 15,
                    paddingVertical: 5,
                  }}
                >
                  <Ionicons
                    name="arrow-back"
                    size={28}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              ),
            })}/>
        </Stack.Navigator>

      </NavigationContainer>
    </RegistroProvider>
  )
}