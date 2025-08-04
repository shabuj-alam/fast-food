import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.sj.fastfood",
    databaseId: '68872840003dc863e4fc',
    bucketId: '688fb0fe003b1dc37db6',
    userCollectionId: '68872bd8002a3ea8fd5c',
    categoriesCollectionId: '688f6064000b84c0a1e9',
    menuCollectionId: '688f61a80010699b7dc9',
    customizationsCollectionId: '688f64be0000dfc12be7',
    menuCustomizationsCollectionId: '688f666d0024df62d839',
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export const createUser = async({email, password, name}: CreateUserParams) => {
    try {
        const newAccount = await account.create(
            ID.unique(), email, password, name
        )
        
        if(!newAccount) throw Error;

        await signIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                name,
                avatar: avatarUrl
            }
        );

    } catch (error) {
        throw new Error(error as string);
    }
}

export const signIn = async({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw new Error(error as string); 
    }
}

export const getCurrentUser = async() => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw Error;

        return currentUser.documents[0];
        
    } catch (error) {
        throw new Error(error as string);   
    }
}

export const getMenu = async({ category, query }: GetMenuParams) => {
    try {
        const  quries: string[] = [];

        if(category) quries.push(Query.equal('Categories', category));
        if(query) quries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            quries
        )

        return menus.documents;

    } catch (error) {
        throw new Error(error as string);
    }
}

export const getCategories = async({}) => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )

        return categories.documents;
    } catch (error) {
        throw new Error(error as string);
    }
}