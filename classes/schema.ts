export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  access: Scalars['String'];
  id: Scalars['String'];
  scope: Scalars['String'];
  expires: Scalars['Float'];
  type: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
};

export type Address = {
  __typename?: 'Address';
  line: Scalars['String'];
  lineAlt?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  postalCode: Scalars['String'];
  placeId: Scalars['String'];
  country: Scalars['String'];
  location: Location;
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['String'];
  userId: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  accountType: AccountType;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  updatedBy?: Maybe<Profile>;
  deletedBy?: Maybe<Profile>;
  deletedAt: Scalars['DateTime'];
  isActive: Scalars['Boolean'];
  account?: Maybe<Account>;
};

export enum AccountType {
  Padmin = 'PADMIN',
  Vadmin = 'VADMIN',
  User = 'USER'
}


export type Account = {
  __typename?: 'Account';
  id: Scalars['String'];
  createdBy: Profile;
  updatedBy?: Maybe<Profile>;
  deletedBy?: Maybe<Profile>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  businessName: Scalars['String'];
  industry: Scalars['String'];
  address: Address;
  isActive: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  userId: Scalars['String'];
  email: Scalars['String'];
  aud: Scalars['String'];
  email_verified: Scalars['String'];
  exp: Scalars['Float'];
  family_name: Scalars['String'];
  given_name: Scalars['String'];
  iat: Scalars['Float'];
  iss: Scalars['String'];
  name: Scalars['String'];
  nickname: Scalars['String'];
  picture: Scalars['String'];
  sub: Scalars['String'];
  updated_at: Scalars['String'];
};

export type MediaDocumentFile = {
  __typename?: 'MediaDocumentFile';
  assembly: Scalars['String'];
  url: Scalars['String'];
};

export type MediaImage = {
  __typename?: 'MediaImage';
  assembly: Scalars['String'];
  small: Scalars['String'];
  medium: Scalars['String'];
  large: Scalars['String'];
  xLarge: Scalars['String'];
};

export type MediaVideo = {
  __typename?: 'MediaVideo';
  service: VideoType;
  url: Scalars['String'];
};

export enum VideoType {
  Youtube = 'YOUTUBE',
  Vimeo = 'VIMEO'
}

export type Media = {
  __typename?: 'Media';
  id: Scalars['String'];
  createdBy: Profile;
  updatedBy?: Maybe<Profile>;
  deletedBy?: Maybe<Profile>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<MediaImage>;
  video?: Maybe<MediaVideo>;
  document?: Maybe<MediaDocumentFile>;
  type: MediaType;
  account: Account;
};

export enum MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO',
  Document = 'DOCUMENT'
}

export type Menuitem = {
  __typename?: 'Menuitem';
  id: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  active: Scalars['Boolean'];
  type: MenuItemType;
};

export enum MenuItemType {
  Page = 'PAGE',
  Performance = 'PERFORMANCE',
  News = 'NEWS'
}

export type Header = {
  __typename?: 'Header';
  name: Scalars['String'];
  type: Scalars['String'];
  logoUrl?: Maybe<Scalars['String']>;
  menuItems?: Maybe<Array<Menuitem>>;
};

export type SiteView = {
  __typename?: 'Site';
  id: Scalars['String'];
  createdBy: Profile;
  updatedBy?: Maybe<Profile>;
  deletedBy?: Maybe<Profile>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  header: Header;
  page?: Maybe<Scalars['String']>;
  account: Account;
  isActive: Scalars['Boolean'];
};

export type Hero = {
  __typename?: 'Hero';
  type: Scalars['String'];
  caption: Scalars['String'];
  mediaUrl: Scalars['String'];
  heading: Scalars['String'];
  hasAction: Scalars['Boolean'];
  actionText: Scalars['String'];
  actionSlug: Scalars['String'];
  location: HeroLocationType;
  media?: Maybe<Media>;
};

export enum HeroLocationType {
  Left = 'LEFT',
  Right = 'RIGHT',
  Top = 'TOP',
  Bottom = 'BOTTOM',
  Center = 'CENTER'
}

export type Page = {
  __typename?: 'Page';
  id: Scalars['String'];
  createdBy: Profile;
  updatedBy?: Maybe<Profile>;
  deletedBy?: Maybe<Profile>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  tags: Array<Scalars['String']>;
  site: Scalars['String'];
  menuItem?: Maybe<Scalars['String']>;
  hero: Hero;
  account: Account;
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['String'];
  createdBy: Profile;
  updatedBy?: Maybe<Profile>;
  deletedBy?: Maybe<Profile>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  type: Scalars['String'];
  description: Scalars['String'];
  mediaUrl: Scalars['String'];
  slug: Scalars['String'];
  content: Scalars['String'];
  draft: Scalars['String'];
  featured: Scalars['String'];
  category: Scalars['String'];
  isActive: Scalars['Boolean'];
  tags: Array<Scalars['String']>;
  pageId: Page;
  siteId: Scalars['String'];
  media?: Maybe<Media>;
  account: Account;
};

export type Stock = {
  __typename?: 'Stock';
  id: Scalars['String'];
  stockID: Scalars['String'];
  exchange: PerformanceHeroStockType;
};

export enum PerformanceHeroStockType {
  Nasdaq = 'NASDAQ'
}

export type PerformanceHero = {
  __typename?: 'PerformanceHero';
  type: Scalars['String'];
  caption: Scalars['String'];
  mediaUrl: Scalars['String'];
  heading: Scalars['String'];
  hasAction: Scalars['Boolean'];
  actionText: Scalars['String'];
  actionSlug: Scalars['String'];
  stock: Stock;
  location: PerformanceHeroLocationType;
  media?: Maybe<Media>;
};

export enum PerformanceHeroLocationType {
  Left = 'LEFT',
  Right = 'RIGHT',
  Top = 'TOP',
  Bottom = 'BOTTOM',
  Center = 'CENTER'
}

export type Quarter = {
  __typename?: 'Quarter';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  start: Scalars['String'];
  stop: Scalars['String'];
  items: Array<Item>;
};

export type Performance = {
  __typename?: 'Performance';
  id: Scalars['String'];
  createdBy: Profile;
  updatedBy?: Maybe<Profile>;
  deletedBy?: Maybe<Profile>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  year: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  start: Scalars['DateTime'];
  stop: Scalars['DateTime'];
  quarter: Array<Quarter>;
  menuItem?: Maybe<Scalars['String']>;
  hero: PerformanceHero;
  account: Account;
};

export type Social = {
  __typename?: 'Social';
  id: Scalars['String'];
  createdBy: Profile;
  updatedBy?: Maybe<Profile>;
  deletedBy?: Maybe<Profile>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  facebook: Scalars['String'];
  instagram: Scalars['String'];
  linkedin: Scalars['String'];
  twitter: Scalars['String'];
  site: Scalars['String'];
  account: Account;
  isActive: Scalars['Boolean'];
};

export type Widget = {
  __typename?: 'Widget';
  id: Scalars['String'];
  createdBy: Profile;
  updatedBy?: Maybe<Profile>;
  deletedBy?: Maybe<Profile>;
  createdAt: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  disable: Scalars['Boolean'];
  title: Scalars['String'];
  items: Array<Item>;
  page: Scalars['String'];
  type: ItemType;
  account: Account;
};

export enum ItemType {
  Item = 'ITEM'
}

export type Query = {
  __typename?: 'Query';
  getUser: User;
  getProfile: Profile;
  profiles: Array<Profile>;
  profile: Profile;
  accounts: Array<Account>;
  account: Account;
  sites: Array<SiteView>;
  site: SiteView;
  siteMenuItems: SiteView;
  pages: Array<Page>;
  page: Page;
  getAllItems: Array<Item>;
  getItem: Item;
  widgets: Array<Widget>;
  widget: Widget;
  medias: Array<Media>;
  media: Media;
  performances: Array<Performance>;
  performance: Performance;
  socials: Array<Social>;
  social: Social;
};


export type QueryProfilesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
  accountId: Scalars['String'];
};


export type QueryProfileArgs = {
  userId: Scalars['String'];
};


export type QueryAccountsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
};


export type QueryAccountArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
};


export type QuerySitesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
  accountId: Scalars['String'];
};


export type QuerySiteArgs = {
  id: Scalars['String'];
  accountId: Scalars['String'];
};


export type QuerySiteMenuItemsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
};


export type QueryPagesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
  accountId: Scalars['String'];
};


export type QueryPageArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
  accountId: Scalars['String'];
};


export type QueryGetAllItemsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
};


export type QueryGetItemArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
};


export type QueryWidgetsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
};


export type QueryWidgetArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
};


export type QueryMediasArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
  accountId: Scalars['String'];
};


export type QueryMediaArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
  accountId: Scalars['String'];
};


export type QueryPerformancesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
};


export type QueryPerformanceArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
};


export type QuerySocialsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortInput>>;
  take?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterInput>;
  accountId: Scalars['String'];
};


export type QuerySocialArgs = {
  accountId: Scalars['String'];
  socialId: Scalars['String'];
};

export type SortInput = {
  field: Scalars['String'];
  order: SortOrderEnum;
};

export enum SortOrderEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type FilterInput = {
  combinedFilter?: Maybe<CombinedFilterInput>;
  singleFilter?: Maybe<SingleFilterInput>;
};

export type CombinedFilterInput = {
  logicalOperator?: Maybe<LogicalOperatorEnum>;
  filters?: Maybe<Array<FilterInput>>;
};

export enum LogicalOperatorEnum {
  And = 'AND',
  Nor = 'NOR',
  Or = 'OR'
}

export type SingleFilterInput = {
  field: Scalars['String'];
  not?: Maybe<Scalars['Boolean']>;
  operator: ComparisonOperatorEnum;
  options?: Maybe<Scalars['String']>;
  value: Scalars['JSON'];
};

export enum ComparisonOperatorEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  In = 'IN',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE',
  Nin = 'NIN',
  Regex = 'REGEX'
}


export type Mutation = {
  __typename?: 'Mutation';
  login: LoginOutput;
  createProfile: Profile;
  createPlatformAdminProfile: Profile;
  updateProfile: Profile;
  softDeleteProfile: Profile;
  createAccount: Account;
  updateAccount: Account;
  removeAccount: Account;
  createSite: SiteView;
  updateSite: SiteView;
  removeSite: SiteView;
  removeSiteSoft: SiteView;
  addMenuItemToSite: SiteView;
  updateSiteMenuItem: SiteView;
  deleteSiteMenuItem: SiteView;
  createPage: Page;
  updatePage: Page;
  removePage: Page;
  createItem: Item;
  updateItem: Item;
  removeItem: Item;
  removeItemSoft: Item;
  createWidget: Widget;
  updateWidget: Widget;
  removeWidget: Widget;
  createMedia: Media;
  updateMedia: Media;
  removeMedia: Media;
  createPerformance: Performance;
  updatePerformance: Performance;
  removePerformance: Performance;
  createPerformanceQuarter: Performance;
  updatePerformanceQuarter: Performance;
  deletePerformanceQuarter: Performance;
  createSocial: Social;
  updateSocial: Social;
  removeSocial: Social;
};


export type MutationLoginArgs = {
  login: LoginInput;
};


export type MutationCreateProfileArgs = {
  profile: CreateProfileInput;
};


export type MutationCreatePlatformAdminProfileArgs = {
  profile: CreateProfileInput;
};


export type MutationUpdateProfileArgs = {
  profileData: UpdateProfileInput;
  userId: Scalars['String'];
};


export type MutationSoftDeleteProfileArgs = {
  userId: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  createAccountInput: CreateAccountInput;
};


export type MutationUpdateAccountArgs = {
  updateAccountInput: UpdateAccountInput;
  accountId: Scalars['String'];
};


export type MutationRemoveAccountArgs = {
  accountId: Scalars['String'];
};


export type MutationCreateSiteArgs = {
  createSiteInput: CreateSiteInput;
};


export type MutationUpdateSiteArgs = {
  updateSiteInput: UpdateSiteInput;
  id: Scalars['String'];
};


export type MutationRemoveSiteArgs = {
  id: Scalars['String'];
};


export type MutationRemoveSiteSoftArgs = {
  id: Scalars['String'];
};


export type MutationAddMenuItemToSiteArgs = {
  menuItem: CreateMenuitemInput;
  siteId: Scalars['String'];
};


export type MutationUpdateSiteMenuItemArgs = {
  updateMenuitemInput: UpdateMenuitemInput;
  menuId: Scalars['String'];
};


export type MutationDeleteSiteMenuItemArgs = {
  menuId: Scalars['String'];
};


export type MutationCreatePageArgs = {
  createPageInput: CreatePageInput;
};


export type MutationUpdatePageArgs = {
  updatePageInput: UpdatePageInput;
  pageId: Scalars['String'];
};


export type MutationRemovePageArgs = {
  pageId: Scalars['String'];
};


export type MutationCreateItemArgs = {
  createItemInput: CreateItemInput;
};


export type MutationUpdateItemArgs = {
  updateItemInput: UpdatedItemInput;
  itemId: Scalars['String'];
};


export type MutationRemoveItemArgs = {
  itemId: Scalars['String'];
};


export type MutationRemoveItemSoftArgs = {
  itemId: Scalars['String'];
};


export type MutationCreateWidgetArgs = {
  createWidgetInput: CreateWidgetInput;
};


export type MutationUpdateWidgetArgs = {
  updateWidgetInput: UpdateWidgetInput;
  widgetId: Scalars['String'];
};


export type MutationRemoveWidgetArgs = {
  widgetId: Scalars['String'];
};


export type MutationCreateMediaArgs = {
  createMediaInput: CreateMediaInput;
};


export type MutationUpdateMediaArgs = {
  updateMediaInput: UpdateMediaInput;
  mediaId: Scalars['String'];
};


export type MutationRemoveMediaArgs = {
  mediaId: Scalars['String'];
};


export type MutationCreatePerformanceArgs = {
  createPerformanceInput: CreatePerformanceInput;
};


export type MutationUpdatePerformanceArgs = {
  updatePerformanceInput: UpdatePerformanceInput;
  performanceId: Scalars['String'];
};


export type MutationRemovePerformanceArgs = {
  performanceId: Scalars['String'];
};


export type MutationCreatePerformanceQuarterArgs = {
  createPerformanceQuarterInput: CreatePerformanceQuarterInput;
  performanceId: Scalars['String'];
};


export type MutationUpdatePerformanceQuarterArgs = {
  updatePerformanceQuarterInput: UpdatePerformanceQuarterInput;
  quarterId: Scalars['String'];
};


export type MutationDeletePerformanceQuarterArgs = {
  quarterId: Scalars['String'];
};


export type MutationCreateSocialArgs = {
  createSocialInput: CreateSocialInput;
};


export type MutationUpdateSocialArgs = {
  updateSocialInput: UpdateSocialInput;
  socialId: Scalars['String'];
};


export type MutationRemoveSocialArgs = {
  socialId: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateProfileInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  accountType: AccountType;
  email: Scalars['String'];
  password: Scalars['String'];
  account?: Maybe<Scalars['String']>;
};

export type UpdateProfileInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  accountType?: Maybe<AccountType>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type CreateAccountInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  businessName: Scalars['String'];
  industry: Scalars['String'];
  address: CreateAddressInput;
};

export type CreateAddressInput = {
  line: Scalars['String'];
  lineAlt?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  postalCode: Scalars['String'];
  placeId: Scalars['String'];
  country: Scalars['String'];
  location: LocationInput;
};

export type LocationInput = {
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
};

export type UpdateAccountInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  businessName?: Maybe<Scalars['String']>;
  industry?: Maybe<Scalars['String']>;
  address?: Maybe<UpdateAddressInput>;
};

export type UpdateAddressInput = {
  line?: Maybe<Scalars['String']>;
  lineAlt?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  placeId?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  location?: Maybe<LocationInput>;
};

export type CreateSiteInput = {
  name: Scalars['String'];
  header: CreateHeaderInput;
  page?: Maybe<Scalars['String']>;
  account: Scalars['String'];
};

export type CreateHeaderInput = {
  name: Scalars['String'];
  type: Scalars['String'];
  logoUrl?: Maybe<Scalars['String']>;
  menuItems: Array<CreateMenuitemInput>;
};

export type CreateMenuitemInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  active: Scalars['Boolean'];
  type: MenuItemType;
};

export type UpdateSiteInput = {
  name?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['String']>;
  header?: Maybe<UpdateHeaderInput>;
};

export type UpdateHeaderInput = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  logoUrl?: Maybe<Scalars['String']>;
  menuItems?: Maybe<Array<UpdateMenuitemInput>>;
};

export type UpdateMenuitemInput = {
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  type?: Maybe<MenuItemType>;
};

export type CreatePageInput = {
  name: Scalars['String'];
  tags: Array<Scalars['String']>;
  site: Scalars['String'];
  menuItem?: Maybe<Scalars['String']>;
  hero: CreateHeroInput;
  account: Scalars['String'];
};

export type CreateHeroInput = {
  type: Scalars['String'];
  caption: Scalars['String'];
  mediaUrl: Scalars['String'];
  heading: Scalars['String'];
  hasAction: Scalars['Boolean'];
  actionText: Scalars['String'];
  actionSlug: Scalars['String'];
  location: HeroLocationType;
  media?: Maybe<Scalars['String']>;
};

export type UpdatePageInput = {
  name?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  site?: Maybe<Scalars['String']>;
  menuItem?: Maybe<Scalars['String']>;
  hero?: Maybe<UpdateHeroInput>;
};

export type UpdateHeroInput = {
  type?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  mediaUrl?: Maybe<Scalars['String']>;
  heading?: Maybe<Scalars['String']>;
  hasAction?: Maybe<Scalars['Boolean']>;
  actionText?: Maybe<Scalars['String']>;
  actionSlug?: Maybe<Scalars['String']>;
  location?: Maybe<HeroLocationType>;
  media?: Maybe<Scalars['String']>;
};

export type CreateItemInput = {
  type: Scalars['String'];
  description: Scalars['String'];
  mediaUrl: Scalars['String'];
  slug: Scalars['String'];
  content: Scalars['String'];
  draft: Scalars['String'];
  featured: Scalars['String'];
  category: Scalars['String'];
  tags: Array<Scalars['String']>;
  pageId?: Maybe<Scalars['String']>;
  siteId: Scalars['String'];
  media?: Maybe<Scalars['String']>;
  account: Scalars['String'];
};

export type UpdatedItemInput = {
  type?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  mediaUrl?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  draft?: Maybe<Scalars['String']>;
  featured?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  pageId?: Maybe<Scalars['String']>;
  siteId?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  account?: Maybe<Scalars['String']>;
};

export type CreateWidgetInput = {
  description: Scalars['String'];
  disable: Scalars['Boolean'];
  title: Scalars['String'];
  items: Array<Scalars['String']>;
  page: Scalars['String'];
  type: ItemType;
  account: Scalars['String'];
};

export type UpdateWidgetInput = {
  description?: Maybe<Scalars['String']>;
  disable?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Scalars['String']>>;
  page?: Maybe<Scalars['String']>;
  type?: Maybe<ItemType>;
  account?: Maybe<Scalars['String']>;
};

export type CreateMediaInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  image?: Maybe<CreateImageInput>;
  video?: Maybe<CreateVideoInput>;
  document?: Maybe<CreateDocumentInput>;
  type: MediaType;
  account: Scalars['String'];
};

export type CreateImageInput = {
  assembly: Scalars['String'];
  small: Scalars['String'];
  medium: Scalars['String'];
  large: Scalars['String'];
  xLarge: Scalars['String'];
};

export type CreateVideoInput = {
  service: Scalars['String'];
  url: Scalars['String'];
};

export type CreateDocumentInput = {
  assembly: Scalars['String'];
  url: Scalars['String'];
};

export type UpdateMediaInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<CreateImageInput>;
  video?: Maybe<CreateVideoInput>;
  document?: Maybe<CreateDocumentInput>;
  type?: Maybe<MediaType>;
  account?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type CreatePerformanceInput = {
  year: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  start: Scalars['DateTime'];
  stop: Scalars['DateTime'];
  menuItem?: Maybe<Scalars['String']>;
  hero: CreatePerformanceHeroInput;
  quarter: Array<CreatePerformanceQuarterInput>;
  account: Scalars['String'];
};

export type CreatePerformanceHeroInput = {
  type: Scalars['String'];
  caption: Scalars['String'];
  mediaUrl: Scalars['String'];
  heading: Scalars['String'];
  hasAction: Scalars['Boolean'];
  actionText: Scalars['String'];
  actionSlug: Scalars['String'];
  location: PerformanceHeroLocationType;
  media?: Maybe<Scalars['String']>;
  stock: PerformanceHeroStockInput;
};

export type PerformanceHeroStockInput = {
  stockID: Scalars['String'];
  exchange: PerformanceHeroStockType;
};

export type CreatePerformanceQuarterInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  start: Scalars['DateTime'];
  stop: Scalars['DateTime'];
  items: Array<Scalars['String']>;
};

export type UpdatePerformanceInput = {
  year?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  stop?: Maybe<Scalars['DateTime']>;
  menuItem?: Maybe<Scalars['String']>;
  hero?: Maybe<CreatePerformanceHeroInput>;
  quarter?: Maybe<Array<CreatePerformanceQuarterInput>>;
  account?: Maybe<Scalars['String']>;
};

export type UpdatePerformanceQuarterInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  stop?: Maybe<Scalars['DateTime']>;
  items?: Maybe<Array<Scalars['String']>>;
  quarter: Array<CreatePerformanceQuarterInput>;
};

export type CreateSocialInput = {
  facebook: Scalars['String'];
  instagram: Scalars['String'];
  linkedin: Scalars['String'];
  twitter: Scalars['String'];
  site: Scalars['String'];
  account: Scalars['String'];
};

export type UpdateSocialInput = {
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
};
