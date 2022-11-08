package com.messengerrn4;

import io.invertase.firebase.database.ReactNativeFirebaseDatabasePackage;
import io.realm.react.RealmReactPackage;

import android.app.Application;
import android.content.Context;

import com.BV.LinearGradient.LinearGradientPackage;
import com.dropShadow.DropShadowPackage;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import com.messengerrn4.newarchitecture.MainApplicationReactNativeHost;

import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.wix.autogrowtextinput.AutoGrowTextInputPackage;

import org.linusu.RNGetRandomValuesPackage;
import org.reactnative.maskedview.RNCMaskedViewPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                protected List<ReactPackage> getPackages() {
//          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
//          // Packages that cannot be autolinked yet can be added manually here, for example:
//          // packages.add(new MyReactNativePackage());
//            packages.add(new MainReactPackage(),
//            new AsyncStoragePackage());
//            packages.add(new ReactNativeFirebaseDatabasePackage());
          return packages;
//                    return Arrays.asList(
////                            new MainReactPackage(),
//                            new RNGestureHandlerPackage(),
//                            new RealmReactPackage(),
//                            new AutoGrowTextInputPackage(),
//                            new DropShadowPackage(),
//                            new RNGetRandomValuesPackage(),
//                            new LinearGradientPackage(),
//                            new RNCMaskedViewPackage(),
//                            new RNScreensPackage(),
//                            new SafeAreaContextPackage(),
//                            new SvgPackage(),
//                            new MainReactPackage(),
//                            new VectorIconsPackage(),
//                            new ReactNativeFirebaseDatabasePackage());
                }

                @Override
                protected String getJSMainModuleName() {
                    return "index";
                }
            };

    private final ReactNativeHost mNewArchitectureNativeHost =
            new MainApplicationReactNativeHost(this);

    @Override
    public ReactNativeHost getReactNativeHost() {
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            return mNewArchitectureNativeHost;
        } else {
            return mReactNativeHost;
        }
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // If you opted-in for the New Architecture, we enable the TurboModule system
        ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        SoLoader.init(this, /* native exopackage */ false);
        initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    }

    /**
     * Loads Flipper in React Native templates. Call this in the onCreate method with something like
     * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
     *
     * @param context
     * @param reactInstanceManager
     */
    private static void initializeFlipper(
            Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
                Class<?> aClass = Class.forName("com.messengerrn4.ReactNativeFlipper");
                aClass
                        .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                        .invoke(null, context, reactInstanceManager);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }
}
