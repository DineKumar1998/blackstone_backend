import React,{useEffect} from "react";
import {Menu,Badge} from "antd";
import {Link} from "react-router-dom";
import NotificationOutlined from "@ant-design/icons/lib/icons/NotificationOutlined";
import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {getUser} from "../../appRedux/actions";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import {useDispatch,useSelector} from "react-redux";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {
  const dispatch = useDispatch();
  const authUser = useSelector(({auth}) => auth.authUser);
  useEffect(() => {
    if(authUser === null){
    dispatch(getUser());
    }
  }, [authUser]);
  let {navStyle, themeType} = useSelector(({settings}) => settings);
  let {pathname} = useSelector(({common}) => common);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };
  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];
 // console.log('keys',defaultOpenKeys);
  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile/>
         {/* <AppsNavigation/>*/}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
         <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">
 {(authUser !== null)?(authUser.Role === 'superadmin')?           
<MenuItemGroup key="main" className="gx-menu-group" title={<IntlMessages id="sidebar.main"/>}>
<Menu.Item key="/Dashboard">
              <Link to="/Dashboard"><i className="icon icon-dasbhoard"/>
                <span style={{fontWeight:400,fontSize:16,fontStyle:'normal'}}>Dashboard</span>
              </Link>
            </Menu.Item>
              <SubMenu key="Branches" popupClassName={getNavStyleSubMenuClass(navStyle)}
              title={<span> <i className="icon icon-apps"/>
              <span style={{fontWeight:400,fontSize:16}}>Branches</span></span>}>

              <Menu.Item key="/branchList">
              <Link to="/branchList" ><i className="icon icon-all-contacts"/>
              <span style={{fontWeight:400,fontSize:16}}>Branch List</span>
              </Link>
              </Menu.Item>

              <Menu.Item key="/newBranch">
              <Link to="/newBranch"><i className="icon icon-add-circle"/>
              <span style={{fontWeight:400,fontSize:16}}>Add Branch</span>
              </Link>
              </Menu.Item>

              </SubMenu>

              <SubMenu key="Products" popupClassName={getNavStyleSubMenuClass(navStyle)}
              title={<span> <i className="icon icon-product-list"/>
              <span style={{fontWeight:400,fontSize:16}}>Products</span></span>}>

              <Menu.Item key="/productList">
              <Link to="/productList" ><i className="icon icon-product-grid"/>
              <span style={{fontWeight:400,fontSize:16}}>Product List</span>
              </Link>
              </Menu.Item>

              <Menu.Item key="/newProduct">
              <Link to="/newProduct"><i className="icon icon-add-circle"/>
              <span style={{fontWeight:400,fontSize:16}}>Add Product</span>
              </Link>
              </Menu.Item>

              </SubMenu>

              <SubMenu key="Service" popupClassName={getNavStyleSubMenuClass(navStyle)}
              title={<span> <i className="icon icon-product-grid"/>
              <span style={{fontWeight:400,fontSize:16}}>Service</span></span>}>
                    <Menu.Item key="/serviceList">
                    <Link to="/serviceList" ><i className="icon icon-product-list"/>
                    <span style={{fontWeight:400,fontSize:16}}>Service List</span>
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="/newService">
                    <Link to="/newService"><i className="icon icon-add-circle"/>
                    <span style={{fontWeight:400,fontSize:16}}>Add Service</span>
                    </Link>
                    </Menu.Item>
                   
              </SubMenu>
              <SubMenu key="Packages" popupClassName={getNavStyleSubMenuClass(navStyle)}
              title={<span> <i className="icon icon-card"/>
              <span style={{fontWeight:400,fontSize:16}}>Packages</span></span>}>

                    <Menu.Item key="/packageList">
                    <Link to="/packageList" ><i className="icon icon-product-list"/>
                    <span style={{fontWeight:400,fontSize:16}}>Package List</span>
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="/newPackage">
                    <Link to="/newPackage"><i className="icon icon-add-circle"/>
                    <span style={{fontWeight:400,fontSize:16}}>Add Package</span>
                    </Link>
                    </Menu.Item>
                   
              </SubMenu>
                       {/* <Menu.Item key="/superadmin/bookings">
                        <Link to="/superadmin/bookings"><i className="icon icon-orders"/>
                        <span style={{fontWeight:400,fontSize:16}}>Bookings</span>
                        </Link>
                        </Menu.Item>*/}

                        <SubMenu key="Bookings" popupClassName={getNavStyleSubMenuClass(navStyle)}
                        title={<span> <i className="icon icon-data-display"/>
                        <span style={{fontWeight:400,fontSize:16}}>Bookings</span></span>}>

                       
                        <Menu.Item key="/superadmin/placedBookings">
                        <Link to="/superadmin/placedBookings"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Placed Booking</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/assignedBookings">
                        <Link to="/superadmin/assignedBookings"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Assigned Booking</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/completedBookings">
                        <Link to="/superadmin/completedBookings"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Completed Booking</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/cancelledBookings">
                        <Link to="/superadmin/cancelledBookings"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Cancelled Booking</span>
                        </Link>
                        </Menu.Item>
                        
                        </SubMenu>
                        <SubMenu key="Reports" popupClassName={getNavStyleSubMenuClass(navStyle)}
                        title={<span> <i className="icon icon-data-display"/>
                        <span style={{fontWeight:400,fontSize:16}}>Reports</span></span>}>

                        <Menu.Item key="/superadmin/completedReports">
                        <Link to="/superadmin/completedReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Completed Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/cancelledReports">
                        <Link to="/superadmin/cancelledReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Cancelled Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/BranchWiseReports">
                        <Link to="/superadmin/BranchWiseReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Branch Wise Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/StaffWiseReports">
                        <Link to="/superadmin/StaffWiseReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Staff Wise Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/CustomerWiseReports">
                        <Link to="/superadmin/CustomerWiseReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Customer Wise Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/ServiceWiseReports">
                        <Link to="/superadmin/ServiceWiseReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Service Wise Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/PackageWiseReports">
                        <Link to="/superadmin/PackageWiseReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Package Wise Reports</span>
                        </Link>
                        </Menu.Item>

                        
                        
                        <Menu.Item key="/superadmin/TodaySalesReports">
                        <Link to="/superadmin/TodaySalesReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Today Sales Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/LastWeekReports">
                        <Link to="/superadmin/LastWeekReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>LastWeek Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/CurrentMonthReports">
                        <Link to="/superadmin/CurrentMonthReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>This Month Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/LastMonthReports">
                        <Link to="/superadmin/LastMonthReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Last Month Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/LastSixMonthReports">
                        <Link to="/superadmin/LastSixMonthReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Last Six Month Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/superadmin/CurrentYearSales">
                        <Link to="/superadmin/CurrentYearSales"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>This Year Sales</span>
                        </Link>
                        </Menu.Item>

                        
                        </SubMenu>

                        <Menu.Item key="/superadmin/sendPromotion">
              <Link to="/superadmin/sendPromotion"><i className="icon icon-mail-open"/>
                <span style={{fontWeight:400,fontSize:16}}>Promotion</span>
              </Link>
  </Menu.Item>
                        <MenuItemGroup key="main" className="gx-menu-group" title="Users">
            
              

            <SubMenu key="Staffs" popupClassName={getNavStyleSubMenuClass(navStyle)}
                        title={<span> <i className="icon icon-apps"/>
                        <span style={{fontWeight:400,fontSize:16}}>Staffs</span></span>}>

                        <Menu.Item key="/staff/staffList">
                        <Link to="/staff/staffList" ><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Staff List</span>
                        </Link>
                        </Menu.Item>

                        <Menu.Item key="/staff/newStaff">
                        <Link to="/staff/newStaff"><i className="icon icon-add-circle"/>
                        <span style={{fontWeight:400,fontSize:16}}>Add Staff</span>
                        </Link>
                        </Menu.Item>

                        </SubMenu>
            <Menu.Item key="/customers/customersList">
              <Link to="/customers/customersList"><i className="icon icon-avatar"/>
                <span style={{fontWeight:400,fontSize:16}}>Customers List</span>
              </Link>
            </Menu.Item>
            </MenuItemGroup>
            </MenuItemGroup>:false:false}

            {(authUser !== null)?(authUser.Role === "Branch")?
                <MenuItemGroup key="main" className="gx-menu-group" title={<IntlMessages id="sidebar.main"/>}>
                    <Menu.Item key="Dashboard">
                    <Link to="/Dashboard"><i className="icon icon-dasbhoard"/>
                    <span style={{fontWeight:400,fontSize:16}}>Dashboard</span>
                    </Link>
                    </Menu.Item>
                       {/*  <SubMenu key="Staffs" popupClassName={getNavStyleSubMenuClass(navStyle)}
                        title={<span> <i className="icon icon-apps"/>
                        <span style={{fontWeight:400,fontSize:16}}>Staffs</span></span>}>

                        <Menu.Item key="/staff/staffList">
                        <Link to="/staff/staffList" ><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Staff List</span>
                        </Link>
                        </Menu.Item>

                        <Menu.Item key="/staff/newStaff">
                        <Link to="/staff/newStaff"><i className="icon icon-add-circle"/>
                        <span style={{fontWeight:400,fontSize:16}}>Add Staff</span>
                        </Link>
                    </Menu.Item>

                        </SubMenu>*/}

                        
                        <Menu.Item key="/newBooking">
                        <Link to="/newBooking"><i className="icon icon-orders"/>
                        <span style={{fontWeight:400,fontSize:16}}>New Booking</span>
                        </Link>
                        </Menu.Item>


                        <SubMenu key="Bookings" popupClassName={getNavStyleSubMenuClass(navStyle)}
                        title={<span> <i className="icon icon-data-display"/>
                        <span style={{fontWeight:400,fontSize:16}}>Bookings</span></span>}>

                       
                        <Menu.Item key="/branch/placedBookings">
                        <Link to="/branch/placedBookings"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Placed Booking</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/assignedBookings">
                        <Link to="/branch/assignedBookings"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Assigned Booking</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/completedBookings">
                        <Link to="/branch/completedBookings"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Completed Booking</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/cancelledBookings">
                        <Link to="/branch/cancelledBookings"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Cancelled Booking</span>
                        </Link>
                        </Menu.Item>
                        
                        </SubMenu>

                        

                        <Menu.Item key="/vacation/index">
                        <Link to="/vacation/index">
                          <i className="icon icon-auth-screen"/>
                          {/*<Badge count={5}>
                              <span className="head-example"/>
  </Badge>*/}
                          <span style={{fontWeight:400,fontSize:16}}>Vacations</span></Link>
                          
                        </Menu.Item>
                        
                        <SubMenu key="Reports" popupClassName={getNavStyleSubMenuClass(navStyle)}
                        title={<span> <i className="icon icon-data-display"/>
                        <span style={{fontWeight:400,fontSize:16}}>Reports</span></span>}>

                        <Menu.Item key="/branch/completedReports">
                        <Link to="/branch/completedReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Completed Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/cancelledReports">
                        <Link to="/branch/cancelledReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Cancelled Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/StaffWiseReports">
                        <Link to="/branch/StaffWiseReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Staff Wise Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/CustomerWiseReports">
                        <Link to="/branch/CustomerWiseReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Customer Wise Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/ServiceWiseReports">
                        <Link to="/branch/ServiceWiseReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Service Wise Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/PackageWiseReports">
                        <Link to="/branch/PackageWiseReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Package Wise Reports</span>
                        </Link>
                        </Menu.Item>


                        <Menu.Item key="/branch/TodaySalesReports">
                        <Link to="/branch/TodaySalesReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Today Sales Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/LastWeekReports">
                        <Link to="/branch/LastWeekReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>LastWeek Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/CurrentMonthReports">
                        <Link to="/branch/CurrentMonthReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>This Month Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/LastMonthReports">
                        <Link to="/branch/LastMonthReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Last Month Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/LastSixMonthReports">
                        <Link to="/branch/LastSixMonthReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Last Six Month Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/branch/CurrentYearSales">
                        <Link to="/branch/CurrentYearSales"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>This Year Sales</span>
                        </Link>
                        </Menu.Item>
                        </SubMenu>
                      

                        <MenuItemGroup key="settings" className="gx-menu-group" title={<IntlMessages id="sidebar.settings"/>}>
                        <SubMenu key="Customers" popupClassName={getNavStyleSubMenuClass(navStyle)}
                        title={<span> <i className="icon icon-avatar"/>
                        <span style={{fontWeight:400,fontSize:16}}>Customers</span></span>}>

                        <Menu.Item key="/customers/customersList">
                        <Link to="/customers/customersList" ><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Customers List</span>
                        </Link>
                        </Menu.Item>

                        <Menu.Item key="/customers/newCustomer">
                        <Link to="/customers/newCustomer"><i className="icon icon-add-circle"/>
                        <span style={{fontWeight:400,fontSize:16}}>Add Customer</span>
                        </Link>
                        </Menu.Item>
                        </SubMenu>
                        <SubMenu key="Rooms" popupClassName={getNavStyleSubMenuClass(navStyle)}
                        title={<span> <i className="icon icon-data-display"/>
                        <span style={{fontWeight:400,fontSize:16}}>Rooms</span></span>}>

                        <Menu.Item key="/room/index">
                        <Link to="/room/index" ><i className="icon icon-home"/>
                        <span style={{fontWeight:400,fontSize:16}}>Rooms List</span>
                        </Link>
                        </Menu.Item>

                        <Menu.Item key="/room/newRoom">
                        <Link to="/room/newRoom"><i className="icon icon-add-circle"/>
                        <span style={{fontWeight:400,fontSize:16}}>Add Room</span>
                        </Link>
                        </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="/newBooking">
                        <a target="_blank" href="https://blackstones-spa.com/UserManual.pdf"><i className="icon icon-user"/>
                        <span style={{fontWeight:400,fontSize:16}}>User Manual</span>
                        </a>
                        </Menu.Item>
                        
                        </MenuItemGroup>
                </MenuItemGroup>
            :false:false}   


{(authUser !== null)?(authUser.Role === "Staff")?
                <MenuItemGroup key="main" className="gx-menu-group" title={<IntlMessages id="sidebar.main"/>}>
                    <Menu.Item key="/staff/dashboard">
                    <Link to="/staff/dashboard"><i className="icon icon-dasbhoard"/>
                    <span style={{fontWeight:400,fontSize:16}}>Dashboard</span>
                    </Link>
                    </Menu.Item>
                        
                    {/*<Menu.Item key="/staff/bookings">
                        <Link to="/staff/bookings"><i className="icon icon-orders"/>
                        <span style={{fontWeight:400,fontSize:16}}>Bookings</span>
                        </Link>
</Menu.Item>*/}

                        <SubMenu key="Bookings" popupClassName={getNavStyleSubMenuClass(navStyle)}
                        title={<span> <i className="icon icon-data-display"/>
                        <span style={{fontWeight:400,fontSize:16}}>Bookings</span></span>}>

                       
                        
                        <Menu.Item key="/staff/assignedBookings">
                        <Link to="/staff/assignedBookings"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Assigned Booking</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/staff/completedBookings">
                        <Link to="/staff/completedBookings"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Completed Booking</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/staff/cancelledBookings">
                        <Link to="/staff/cancelledBookings"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Cancelled Booking</span>
                        </Link>
                        </Menu.Item>
                        
                       </SubMenu>
                       {/*  <SubMenu key="Customers" popupClassName={getNavStyleSubMenuClass(navStyle)}
                        title={<span> <i className="icon icon-avatar"/>
                        <span style={{fontWeight:400,fontSize:16}}>Customers</span></span>}>

                        <Menu.Item key="/branch/customerList">
                        <Link to="/branch/customerList" ><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Customers List</span>
                        </Link>
                        </Menu.Item>

                        <Menu.Item key="/customer/newCustomer">
                        <Link to="/customer/newCustomer"><i className="icon icon-add-circle"/>
                        <span style={{fontWeight:400,fontSize:16}}>Add Customer</span>
                        </Link>
                        </Menu.Item>

                       </SubMenu>*/}

                        <SubMenu key="Reports" popupClassName={getNavStyleSubMenuClass(navStyle)}
                        title={<span> <i className="icon icon-data-display"/>
                        <span style={{fontWeight:400,fontSize:16}}>Reports</span></span>}>

                        <Menu.Item key="/staff/completedReports">
                        <Link to="/staff/completedReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Completed Reports</span>
                        </Link>
                        </Menu.Item>
                        <Menu.Item key="/staff/cancelledReports">
                        <Link to="/staff/cancelledReports"><i className="icon icon-all-contacts"/>
                        <span style={{fontWeight:400,fontSize:16}}>Cancelled Reports</span>
                        </Link>
                        </Menu.Item>
                        </SubMenu>
                        
                        <MenuItemGroup key="settings" className="gx-menu-group" title={<IntlMessages id="sidebar.settings"/>}>
                       
                        <SubMenu key="Rooms" popupClassName={getNavStyleSubMenuClass(navStyle)}
                        title={<span> <i className="icon icon-auth-screen"/>
                        <span style={{fontWeight:400,fontSize:16}}>vacation</span></span>}>

                        <Menu.Item key="/vacation/index">
                        <Link to="/vacation/index" ><i className="icon icon-wysiwyg"/>
                        <span style={{fontWeight:400,fontSize:16}}>vacation List</span>
                        </Link>
                        </Menu.Item>

                        <Menu.Item key="/vacation/apply">
                        <Link to="/vacation/apply"><i className="icon icon-add-circle"/>
                        <span style={{fontWeight:400,fontSize:16}}>Create vacation</span>
                        </Link>
                        </Menu.Item>
                        

                        </SubMenu>
                        <Menu.Item key="/newBooking">
                        <a target="_blank" href="https://blackstones-spa.com/UserManual.pdf"><i className="icon icon-user"/>
                        <span style={{fontWeight:400,fontSize:16}}>User Manual</span>
                        </a>
                        </Menu.Item>
                        </MenuItemGroup>
                </MenuItemGroup>
            :false:false}

{(authUser !== null)?(authUser.Role === "Customer")?
                <MenuItemGroup key="main" className="gx-menu-group" title={<IntlMessages id="sidebar.main"/>}>
                    <Menu.Item key="/user/dashboard">
                    <Link to="/user/dashboard"><i className="icon icon-dasbhoard"/>
                    <span style={{fontWeight:400,fontSize:16}}>Dashboard</span>
                    </Link>
                    </Menu.Item>
                    <Menu.Item key="/user/packages">
                    <Link to="/user/packages"><i className="icon icon-product-list"/>
                    <span style={{fontWeight:400,fontSize:16}}>Packages</span>
                    </Link>
                    </Menu.Item>
                    {/*<Menu.Item key="/user/packages">
                    <Link to="/user/packages"><i className="icon icon-add-circle"/>
                    <span>Create Booking</span>
                    </Link>
</Menu.Item>*/}
                    <Menu.Item key="/user/bookings">
                    <Link to="/user/bookings"><i className="icon icon-product-grid"/>
                    <span style={{fontWeight:400,fontSize:16}}>Booking History</span>
                    </Link>
                    </Menu.Item>
                </MenuItemGroup>
            :false:false}   



          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

SidebarContent.propTypes = {};
export default SidebarContent;

