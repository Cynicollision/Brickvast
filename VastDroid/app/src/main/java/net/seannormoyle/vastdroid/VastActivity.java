package net.seannormoyle.vastdroid;

import android.app.Activity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.webkit.WebView;


public class VastActivity extends Activity
{
    private final String URL = "file:///android_asset/demo/mazegame/demo_mazegame1.html";
    private WebView webView;

    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        this.getWindow().requestFeature(Window.FEATURE_PROGRESS);
        setContentView(R.layout.main);
        startWebView();
    }

    /**
     * Builds and configures the WebView object then loads a target page.
     */
    private void startWebView() {
        webView = (WebView)findViewById(R.id.webview);
        webView.getSettings().setJavaScriptEnabled(true);

        // disable scroll on touch
        webView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                return (event.getAction() == MotionEvent.ACTION_MOVE);
            }
        });

        // load the page
        webView.post(new Runnable() {
            @Override
            public void run() {
                webView.loadUrl(URL);
            }
        });
    }
}